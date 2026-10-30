<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

require __DIR__ . '/lib/PHPMailer/Exception.php';
require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

function clean_field($value) {
    $value = trim((string) ($value ?? ''));
    return str_replace(["\r", "\n"], ' ', $value);
}

// Honeypot: bots tend to fill every field, real users never see/fill this one.
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$nome = clean_field($_POST['nome'] ?? '');
$email = clean_field($_POST['email'] ?? '');
$telefone = clean_field($_POST['telefone'] ?? '');
$area = clean_field($_POST['area'] ?? '');
$experiencia = clean_field($_POST['experiencia'] ?? '');

if ($nome === '' || $email === '' || $telefone === '' || $area === '' || $experiencia === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'missing_fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'invalid_email']);
    exit;
}

$configPath = __DIR__ . '/smtp-config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'config_missing']);
    exit;
}
$config = require $configPath;

$to = 'contato@blackdiamondcorpservices.com';
$subject = 'Nova solicitação de avaliação de perfil - ' . $nome;

$body = "Nova solicitação de avaliação de perfil recebida pelo site:\n\n"
      . "Nome completo: {$nome}\n"
      . "E-mail: {$email}\n"
      . "WhatsApp / Telefone: {$telefone}\n"
      . "Área de atuação: {$area}\n"
      . "Anos de experiência: {$experiencia}\n";

// WhatsApp link: digits only. Brazilian numbers typed without the country code get 55.
$digits = preg_replace('/\D+/', '', $telefone);
if (strlen($digits) === 10 || strlen($digits) === 11) {
    $digits = '55' . $digits;
}
$whatsappUrl = (strlen($digits) >= 12 && strlen($digits) <= 15) ? 'https://wa.me/' . $digits : '';

if ($whatsappUrl !== '') {
    $body .= "\nAbrir conversa no WhatsApp: {$whatsappUrl}\n";
}

// HTML version of the message. If the template file is missing, the plain text above is sent on its own.
$html = '';
$templatePath = __DIR__ . '/lib/email-template.html';
$template = is_readable($templatePath) ? file_get_contents($templatePath) : false;
if ($template !== false && $template !== '') {
    $esc = function ($value) {
        return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
    };
    $telefoneHtml = $whatsappUrl !== ''
        ? '<a href="' . $esc($whatsappUrl) . '" style="color:#111111;text-decoration:none;">' . $esc($telefone) . '</a>'
        : $esc($telefone);
    $botaoHtml = $whatsappUrl !== ''
        ? '<tr><td style="padding:8px 24px 4px 24px;"><a href="' . $esc($whatsappUrl) . '" style="display:inline-block;background:#cfa663;color:#111111;text-decoration:none;font-weight:bold;font-size:15px;padding:12px 20px;border-radius:8px;">Chamar no WhatsApp</a></td></tr>'
        : '';
    $html = strtr($template, [
        '{{ASSUNTO}}' => $esc($subject),
        '{{NOME}}' => $esc($nome),
        '{{EMAIL}}' => $esc($email),
        '{{TELEFONE}}' => $telefoneHtml,
        '{{AREA}}' => $esc($area),
        '{{EXPERIENCIA}}' => $esc($experiencia),
        '{{BOTAO_WHATSAPP}}' => $botaoHtml,
    ]);
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $config['host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['username'];
    $mail->Password = $config['password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $config['port'];
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($config['from'], $config['from_name']);
    $mail->addAddress($to);
    $mail->addReplyTo($email, $nome);

    $mail->Subject = $subject;
    if ($html !== '') {
        $mail->isHTML(true);
        $mail->Body = $html;
        $mail->AltBody = $body;
    } else {
        $mail->isHTML(false);
        $mail->Body = $body;
    }
    // No PHPMailer signature header; Message-ID on our own domain.
    $mail->XMailer = ' ';
    $mail->MessageID = '<' . md5(uniqid((string) mt_rand(), true)) . '@blackdiamondcorpservices.com>';

    $mail->send();
    echo json_encode(['ok' => true]);
} catch (PHPMailerException $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
