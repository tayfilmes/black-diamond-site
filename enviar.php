<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

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

$to = 'contato@blackdiamondcorpservices.com';
$subject = '=?UTF-8?B?' . base64_encode('Nova solicitação de avaliação de perfil - ' . $nome) . '?=';

$body = "Nova solicitação de avaliação de perfil recebida pelo site:\n\n"
      . "Nome completo: {$nome}\n"
      . "E-mail: {$email}\n"
      . "WhatsApp / Telefone: {$telefone}\n"
      . "Área de atuação: {$area}\n"
      . "Anos de experiência: {$experiencia}\n";

$headers = [
    'From: Site Black Diamond <no-reply@blackdiamondcorpservices.com>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
