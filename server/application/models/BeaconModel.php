<?php

class BeaconModel extends MY_Model {

    function __construct() {
        parent::__construct();
        $this->table = 'beacon';
    }
    
}