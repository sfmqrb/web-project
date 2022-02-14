import React, { useState, useEffect } from "react";
import "./submitDiscardFooter.css";

export default function SubmitDiscardFooter(props) {
  return (
    <footer className="row footer-bottom footer-recipe">
      <button
        className="btn btn-primary submit-discard-footer-center"
        onClick={props.onSubmit}>
        {props.submitTitle}
      </button>
      <button
        className="btn btn-danger submit-discard-footer-center"
        onClick={props.onDiscard}>
        {props.discardTitle}
      </button>
    </footer>
  );
}
