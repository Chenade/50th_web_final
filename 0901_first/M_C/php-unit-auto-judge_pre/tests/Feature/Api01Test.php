<?php

namespace WorldSkills\Trade17\Tests\Feature;

use WorldSkills\Trade17\Tests\Helper\ReadTest;

class Api01Test extends ReadTest
{
    /**
     * Test login with correct credentials
     */
    public function testA01UserLoginSuccess()
    {
        // test ADMIN
        $resAdmin = $this->http->post($this->api_prefix . '/login', [
            'json' => [
                'email' => 'root@localhost',
                'password' => 'a1s5d9',
            ],
        ]);

        $this->assertStatusCode(200, $resAdmin);
        $this->assertResponse([
            "success" => true,
            "message" => "",
            "data" => "0a44f8735cbc275f1efcdf43159dcd20e54a1c994d0daeb92d04c389078057b5"
        ], $resAdmin);

        // test NORMAL
        $resNormal = $this->http->post($this->api_prefix . '/login', [
            'json' => [
                'email' => 'user1@localhost',
                'password' => 'user1pass',
            ],
        ]);

        $this->assertStatusCode(200, $resNormal);
        $this->assertResponse([
            "success" => true,
            "message" => "",
            "data" => "462d5f5fb3c12bfd376eafe181f896dbc2de7a42d8bc14f1603d62299722126e"
        ], $resNormal);
    }

    /**
     * Test if login is possible for user is not enabled
     */
    public function testA01UserLoginDisabled()
    {
        $res = $this->http->post($this->api_prefix . '/login', [
            'json' => [
                'email' => 'user2@localhost',
                'password' => 'user2pass',
            ],
        ]);

        $this->assertStatusCode(200, $res);
        $this->assertResponse([
            "success" => false,
            "message" => "USER_IS_DISABLED",
            "data" => ""
        ], $res);
    }

    /**
     * Test login with a valid invalid email
     */
    public function testA01UserLoginInvalidEmail()
    {
        $res = $this->http->post($this->api_prefix . '/login', [
            'json' => [
                'email' => 'xxx@xxx.xxx',
                'password' => 'xxxxxxxx',
            ],
        ]);

        $this->assertStatusCode(200, $res);
        $this->assertResponse([
            "success" => false,
            "message" => "INVALID_LOGIN",
            "data" => ""
        ], $res);
    }

    /**
     * Test login with a valid invalid password
     */
    public function testA01UserLoginInvalidPassword()
    {
        $res = $this->http->post($this->api_prefix . '/login', [
            'json' => [
                'email' => 'root@localhost',
                'password' => 'xxxxxxxx',
            ],
        ]);

        $this->assertStatusCode(200, $res);
        $this->assertResponse([
            "success" => false,
            "message" => "INVALID_LOGIN",
            "data" => ""
        ], $res);
    }

    /**
     * Test submitting invalid request parameters
     */
    public function testA01UserLoginInvalidRequest()
    {
        $res = $this->http->post($this->api_prefix . '/login', [
            'json' => [
                'foo' => 'bar',
            ],
        ]);

        $this->assertStatusCode(200, $res);
        $this->assertResponse([
            "success" => false,
            "message" => "INVALID_LOGIN",
            "data" => ""
        ], $res);
    }
}
