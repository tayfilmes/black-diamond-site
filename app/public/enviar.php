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
    $mail->Body = $body;
    $mail->isHTML(false);

    $mail->send();
    echo json_encode(['ok' => true]);
} catch (PHPMailerException $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
