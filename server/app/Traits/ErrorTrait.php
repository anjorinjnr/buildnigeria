<?php

namespace BuildNigeria\Traits;

/**
 * Description of ErrorTrait
 *
 * @author eanjorin
 */
trait ErrorTrait {

    protected $errors = array();

    /**
     * Return all errors and clear errors
     * @return array
     */
    public function errors() {
        $errors = $this->errors;
        $this->errors = [];
        return $errors;
    }

    /**
     * Set list of errors
     * @param $error
     */
    public function setError($error) {
        if (is_array($this->errors)) {
            $this->errors = $error;
        }
    }

    /**
     * Return true if there is an error
     * @return bool
     */
    public function hasError() {
        return count($this->errors) > 0;
    }

    /**
     * append or merge an error to the error array
     */
    public function addError($error) {
        if (is_array($error)) {
            $this->errors = array_merge($this->errors, $error);
        } else {
            $this->errors[] = $error;
        }
    }
    public function clearErrors(){
        $this->errors = [];
        return $this;
    }

}
