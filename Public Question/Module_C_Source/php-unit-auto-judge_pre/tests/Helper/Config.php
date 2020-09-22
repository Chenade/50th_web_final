<?php

namespace WorldSkills\Trade17\Tests\Helper;

class Config {
    public static $LOGIN_TOKEN = [
        'sysop' => 'd03bfc62c1d2f32052b8fb6c6d1357516a7ff7ec6f6e96501eb7bde2073bf9d2',
        'user1' => '462d5f5fb3c12bfd376eafe181f896dbc2de7a42d8bc14f1603d62299722126e',
    ];
    public static $USERS = [
        'sysop' => ['email' => 'root@localhost', 'password' => 'a1s5d9'],
        'user1' => ['email' => 'user1@localhost', 'password' => 'user1pass'],
    ];

    /**
     * Parse env file
     */
    public static function parseEnvFile()
    {
        @ini_set('auto_detect_line_endings', true);

        $path = __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'.env';
        if (file_exists($path)) {
            $fn = fopen($path, 'r');

            while (!feof($fn)) {
                $line = trim(fgets($fn));

                if (substr($line, 0, 1) !== '#' && substr($line, 0, 1) !== ';') {
                    $eqPos = strpos($line, '=');
                    $key = substr($line, 0, $eqPos);
                    $value = trim(substr($line, $eqPos + 1));
                    $existing = getenv($key);

                    if ($eqPos > 0 && ($existing === false || $existing === '')) {
                        putenv($key.'='.$value);
                    }
                }
            }

            fclose($fn);
        }
    }

    /**
     * Get the test configuration.
     * Default values can be overwritten with environment variables.
     */
    public static function get()
    {
        $url = getenv('URL') ?: 'http://localhost';
        if (substr($url, 0, 4) !== 'http') {
            $url = 'http://' . $url;
        }

        return [
            'db_host' => getenv('DB_HOST') ?: '127.0.0.1',
            'db_user' => getenv('DB_USER') ?: 'root',
            'db_pw' => getenv('DB_PW') ?: '',
            'db_name' => getenv('DB_NAME') ?: 'video_platform_sample',
            'basic_auth_user' => getenv('BASIC_AUTH_USER') ?: '',
            'basic_auth_pw' => getenv('BASIC_AUTH_PW') ?: '',
            'url' => $url,
        ];
    }
}
