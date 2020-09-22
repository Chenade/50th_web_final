<?php

namespace WorldSkills\Trade17\Tests\Feature;

use WorldSkills\Trade17\Tests\Helper\ReadTest;

class Api02Test extends ReadTest
{
    /**
     * Test if logout is possible after a successful login
     */
    public function testA02Logout()
    {
        // login the user and get the token
        $token = $this->getLoginToken();

        // logout the user
        $res = $this->http->post($this->api_prefix . '/logout', [
            'token' => $token,
        ]);

        $this->assertStatusCode(200, $res);
        $this->assertResponse([
            "success" => true,
            "message" => "",
            "data" => ""
        ], $res);
    }

    /**
     * Test logout without token
     */
    public function testA02LogoutWithoutToken()
    {
        $res = $this->http->post($this->api_prefix . '/logout');

        $this->assertStatusCode(200, $res);
        $this->assertResponse([
            "success" => false,
            "message" => "INVALID_TOKEN",
            "data" => ""
        ], $res);
    }

    /**
     * Test logout with an invalid token
     */
    public function testA02LogoutWithInvalidToken()
    {
        $res = $this->http->post($this->api_prefix . '/logout', [
            'token' => 'invalidtoken',
        ]);

        $this->assertStatusCode(200, $res);
        $this->assertResponse([
            "success" => false,
            "message" => "INVALID_TOKEN",
            "data" => ""
        ], $res);
    }
}
