import { NextResponse } from "next/server";
import {  transporter } from "../../../lib/nodemailer";

export async function POST(req, res) {
  const { email, subject, message } = await req.json();


  try {
    const data=await transporter.verify();
    if(!data){
      throw new Error("Email server not ready");
    }
    // 1️⃣ Mail to Owner (you)
    const ownerMail = {
      from: `"Portfolio Contact" <${process.env.AdminEmail}>`,
      to: process.env.AdminEmail,
      subject: `📩 New Portfolio Message: ${subject || "No subject"}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4CAF50;">New Message from Portfolio</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="margin: 20px 0;">
          <p style="font-size: 15px; line-height: 1.5;">${message}</p>
        </div>
      `,
    };

    // 2️⃣ Auto-reply to Sender
    const senderMail = {
      from: `"Ismail Abbasi" <${process.env.AdminEmail}>`,
      to: email,
      subject: "✅ Your message was received",
      html: `
       <!DOCTYPE html>
<html lang="english">
  <head>
    <title>exported project</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8" />
    <meta property="twitter:card" content="summary_large_image" />

    <style data-tag="reset-style-sheet">
      html {  line-height: 1.15;}body {  margin: 0;}* {  box-sizing: border-box;  border-width: 0;  border-style: solid;  -webkit-font-smoothing: antialiased;}p,li,ul,pre,div,h1,h2,h3,h4,h5,h6,figure,blockquote,figcaption {  margin: 0;  padding: 0;}button {  background-color: transparent;}button,input,optgroup,select,textarea {  font-family: inherit;  font-size: 100%;  line-height: 1.15;  margin: 0;}button,select {  text-transform: none;}button,[type="button"],[type="reset"],[type="submit"] {  -webkit-appearance: button;  color: inherit;}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner {  border-style: none;  padding: 0;}button:-moz-focus,[type="button"]:-moz-focus,[type="reset"]:-moz-focus,[type="submit"]:-moz-focus {  outline: 1px dotted ButtonText;}a {  color: inherit;  text-decoration: inherit;}pre {  white-space: normal;}input {  padding: 2px 4px;}img {  display: block;}details {  display: block;  margin: 0;  padding: 0;}summary::-webkit-details-marker {  display: none;}[data-thq="accordion"] [data-thq="accordion-content"] {  max-height: 0;  overflow: hidden;  transition: max-height 0.3s ease-in-out;  padding: 0;}[data-thq="accordion"] details[data-thq="accordion-trigger"][open] + [data-thq="accordion-content"] {  max-height: 1000vh;}details[data-thq="accordion-trigger"][open] summary [data-thq="accordion-icon"] {  transform: rotate(180deg);}html { scroll-behavior: smooth  }
    </style>
    <style data-tag="default-style-sheet">
      html {
        font-family: Inter;
        font-size: 16px;
      }

      body {
        font-weight: 400;
        font-style:normal;
        text-decoration: none;
        text-transform: none;
        letter-spacing: normal;
        line-height: 1.15;
        color: var(--dl-color-theme-neutral-dark);
        background: var(--dl-color-theme-neutral-light);

        fill: var(--dl-color-theme-neutral-dark);
      }
    </style>
    <style data-tag="consolidated-styles">
      /* CSS Variables and Global Styles from style.css */
      :root {
        --dl-layout-size-large: 144px;
        --dl-layout-size-small: 48px;
        --dl-layout-space-unit: 16px;
        --dl-layout-size-medium: 96px;
        --dl-layout-size-xlarge: 192px;
        --dl-layout-size-xsmall: 16px;
        --dl-color-default-black: rgba(25, 25, 25, 1);
        --dl-color-default-white: rgba(255, 255, 255, 1);
        --dl-color-theme-accent1: #FFFFFF;
        --dl-color-theme-accent2: #F5D1B0;
        --dl-layout-radius-round: 50%;
        --dl-layout-size-xxlarge: 288px;
        --dl-color-theme-primary1: #BF4408;
        --dl-color-theme-primary2: #E65103;
        --dl-layout-size-maxwidth: 1400px;
        --dl-layout-radius-radius2: 2px;
        --dl-layout-radius-radius4: 4px;
        --dl-layout-radius-radius8: 8px;
        --dl-layout-space-halfunit: 8px;
        --dl-layout-space-sixunits: 96px;
        --dl-layout-space-twounits: 32px;
        --dl-color-theme-secondary1: #FFFFFF;
        --dl-color-theme-secondary2: #FBF1EB;
        --dl-layout-space-fiveunits: 80px;
        --dl-layout-space-fourunits: 64px;
        --dl-layout-space-threeunits: 48px;
        --dl-color-theme-neutral-dark: #191818;
        --dl-layout-radius-cardradius: 8px;
        --dl-color-theme-neutral-light: #FBFAF9;
        --dl-layout-radius-imageradius: 8px;
        --dl-layout-radius-inputradius: 24px;
        --dl-layout-radius-buttonradius: 24px;
        --dl-layout-space-oneandhalfunits: 24px;
        --dl-color-sweet-friday-431281.framer.app-black: rgba(0, 0, 0, 1);
        --dl-color-sweet-friday-431281.framer.app-white: rgba(255, 255, 255, 1);
        --dl-color-sweet-friday-431281.framer.app-silver: rgba(186, 186, 186, 1);
        --dl-color-sweet-friday-431281.framer.app-white5: rgba(255, 255, 255, 0.05000000074505806);
        --dl-color-sweet-friday-431281.framer.app-black20: rgba(0, 0, 0, 0.20000000298023224);
        --dl-color-sweet-friday-431281.framer.app-black70: rgba(0, 0, 0, 0.699999988079071);
        --dl-color-sweet-friday-431281.framer.app-boulder: rgba(120, 120, 120, 1);
        --dl-color-sweet-friday-431281.framer.app-codgray: rgba(13, 13, 13, 1);
        --dl-color-sweet-friday-431281.framer.app-white02: rgba(255, 255, 255, 0.0020000000949949026);
        --dl-color-sweet-friday-431281.framer.app-white10: rgba(255, 255, 255, 0.10000000149011612);
        --dl-color-sweet-friday-431281.framer.app-white12: rgba(255, 255, 255, 0.11999999731779099);
        --dl-color-sweet-friday-431281.framer.app-white15: rgba(255, 255, 255, 0.15000000596046448);
        --dl-color-sweet-friday-431281.framer.app-white75: rgba(255, 255, 255, 0.75);
        --dl-color-sweet-friday-431281.framer.app-white90: rgba(255, 255, 255, 0.8999999761581421);
        --dl-color-sweet-friday-431281.framer.app-codgray80: rgba(13, 13, 13, 0.800000011920929);
        --dl-color-sweet-friday-431281.framer.app-codgray90: rgba(17, 17, 17, 0.8999999761581421);
        --dl-color-sweet-friday-431281.framer.app-dustygray: rgba(153, 153, 153, 1);
        --dl-color-sweet-friday-431281.framer.app-mineshaft: rgba(34, 34, 34, 1);
        --dl-color-sweet-friday-431281.framer.app-whiteblack: rgba(255, 255, 255, 1);
        --dl-color-sweet-friday-431281.framer.app-fuchsiablue: rgba(129, 74, 200, 1);
        --dl-color-sweet-friday-431281.framer.app-mineshaft80: rgba(34, 34, 34, 0.800000011920929);
        --dl-color-sweet-friday-431281.framer.app-heliotrope10: rgba(223, 122, 254, 0.10000000149011612);
      }

      .button {
        color: var(--dl-color-theme-neutral-dark);
        display: inline-block;
        padding: 0.5rem 1rem;
        border-color: var(--dl-color-theme-neutral-dark);
        border-width: 1px;
        border-radius: 4px;
        background-color: var(--dl-color-theme-neutral-light);
      }

      .input {
        color: var(--dl-color-theme-neutral-dark);
        cursor: auto;
        padding: 0.5rem 1rem;
        border-color: var(--dl-color-theme-neutral-dark);
        border-width: 1px;
        border-radius: 4px;
        background-color: var(--dl-color-theme-neutral-light);
      }

      .textarea {
        color: var(--dl-color-theme-neutral-dark);
        cursor: auto;
        padding: 0.5rem;
        border-color: var(--dl-color-theme-neutral-dark);
        border-width: 1px;
        border-radius: 4px;
        background-color: var(--dl-color-theme-neutral-light);
      }

      .list {
        width: 100%;
        margin: 1em 0px 1em 0px;
        display: block;
        padding: 0px 0px 0px 1.5rem;
        list-style-type: none;
        list-style-position: outside;
      }

      .list-item {
        display: list-item;
      }

      .teleport-show {
        display: flex !important;
        transform: none !important;
      }

      .thq-input {
        color: var(--dl-color-theme-neutral-dark);
        cursor: auto;
        outline: none;
        padding: 0.5rem 1rem;
        align-self: stretch;
        text-align: center;
        border-color: var(--dl-color-theme-neutral-dark);
        border-width: 1px;
        border-radius: var(--dl-layout-radius-inputradius);
        background-color: var(--dl-color-theme-neutral-light);
      }

      .thq-input:focus {
        outline: 1px solid var(--dl-color-theme-primary1);
      }

      .thq-button-filled {
        gap: var(--dl-layout-space-halfunit);
        fill: var(--dl-color-theme-secondary1);
        color: var(--dl-color-theme-secondary1);
        cursor: pointer;
        display: flex;
        transition: 0.3s;
        align-items: center;
        font-weight: bold;
        padding-top: var(--dl-layout-space-halfunit);
        white-space: nowrap;
        border-color: var(--dl-color-theme-primary1);
        border-width: 1px;
        padding-left: var(--dl-layout-space-oneandhalfunits);
        border-radius: var(--dl-layout-radius-buttonradius);
        padding-right: var(--dl-layout-space-oneandhalfunits);
        padding-bottom: var(--dl-layout-space-halfunit);
        justify-content: center;
        background-color: var(--dl-color-theme-primary1);
      }

      .thq-button-filled:hover {
        fill: var(--dl-color-theme-secondary2);
        color: var(--dl-color-theme-secondary2);
        border-color: var(--dl-color-theme-primary2);
        background-color: var(--dl-color-theme-primary2);
      }

      .thq-button-outline {
        gap: var(--dl-layout-space-halfunit);
        fill: var(--dl-color-theme-primary1);
        color: var(--dl-color-theme-primary1);
        border: 1px solid;
        cursor: pointer;
        display: flex;
        transition: 0.3s;
        align-items: center;
        font-weight: bold;
        padding-top: var(--dl-layout-space-halfunit);
        white-space: nowrap;
        border-color: var(--dl-color-theme-primary1);
        padding-left: var(--dl-layout-space-oneandhalfunits);
        border-radius: var(--dl-layout-radius-buttonradius);
        padding-right: var(--dl-layout-space-oneandhalfunits);
        padding-bottom: var(--dl-layout-space-halfunit);
        justify-content: center;
      }

      .thq-button-outline:hover {
        fill: var(--dl-color-theme-secondary2);
        color: var(--dl-color-theme-secondary2);
        border-color: var(--dl-color-theme-primary2);
        background-color: var(--dl-color-theme-primary2);
      }

      .thq-button-flat {
        gap: var(--dl-layout-space-halfunit);
        fill: var(--dl-color-theme-primary1);
        color: var(--dl-color-theme-primary1);
        cursor: pointer;
        display: flex;
        transition: 0.3s;
        align-items: center;
        font-weight: bold;
        padding-top: var(--dl-layout-space-halfunit);
        white-space: nowrap;
        border-color: transparent;
        border-width: 1px;
        padding-left: var(--dl-layout-space-oneandhalfunits);
        border-radius: var(--dl-layout-radius-buttonradius);
        padding-right: var(--dl-layout-space-oneandhalfunits);
        padding-bottom: var(--dl-layout-space-halfunit);
        justify-content: center;
      }

      .thq-button-flat:hover {
        fill: var(--dl-color-theme-secondary1);
        color: var(--dl-color-theme-secondary1);
        border-color: var(--dl-color-theme-primary2);
        background-color: var(--dl-color-theme-primary2);
      }

      .thq-heading-1 {
        font-size: 48px;
        font-family: STIX Two Text;
        font-weight: 700;
        line-height: 1.5;
      }

      .thq-heading-2 {
        font-size: 35px;
        font-family: STIX Two Text;
        font-weight: 600;
        line-height: 1.5;
      }

      .thq-heading-3 {
        font-size: 26px;
        font-family: STIX Two Text;
        font-weight: 600;
        line-height: 1.5;
      }

      .thq-body-large {
        font-size: 18px;
        font-family: Noto Sans;
        line-height: 1.5;
      }

      .thq-body-small {
        font-size: 16px;
        font-family: Noto Sans;
        line-height: 1.5;
      }

      .thq-team-image-round {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 50%;
      }

      .thq-section-padding {
        width: 100%;
        display: flex;
        padding: var(--dl-layout-space-fiveunits);
        position: relative;
        align-items: center;
        flex-direction: column;
      }

      .thq-section-max-width {
        width: 100%;
        max-width: var(--dl-layout-size-maxwidth);
      }

      .thq-img-ratio-1-1 {
        width: 100%;
        object-fit: cover;
        aspect-ratio: 1/1;
        border-radius: var(--dl-layout-radius-imageradius);
      }

      .thq-img-ratio-16-9 {
        width: 100%;
        object-fit: cover;
        aspect-ratio: 16/9;
        border-radius: var(--dl-layout-radius-imageradius);
      }

      .thq-img-ratio-4-3 {
        width: 100%;
        object-fit: cover;
        aspect-ratio: 4/3;
        border-radius: var(--dl-layout-radius-imageradius);
      }

      .thq-img-ratio-4-6 {
        width: 100%;
        object-fit: cover;
        aspect-ratio: 4/6;
        border-radius: var(--dl-layout-radius-imageradius);
      }

      .thq-img-round {
        width: 100%;
        border-radius: var(--dl-layout-radius-round);
      }

      .thq-flex-column {
        gap: var(--dl-layout-space-twounits);
        display: flex;
        overflow: hidden;
        position: relative;
        align-items: center;
        flex-direction: column;
      }

      .thq-flex-row {
        gap: var(--dl-layout-space-twounits);
        display: flex;
        overflow: hidden;
        position: relative;
        align-items: center;
      }

      .thq-grid-6 {
        display: grid;
        grid-gap: var(--dl-layout-space-twounits);
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      }

      .thq-grid-5 {
        display: grid;
        grid-gap: var(--dl-layout-space-twounits);
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      }

      .thq-card {
        gap: var(--dl-layout-space-oneandhalfunits);
        display: flex;
        padding: var(--dl-layout-space-twounits);
        align-items: stretch;
        border-radius: var(--dl-layout-radius-cardradius);
        flex-direction: column;
      }

      .thq-box-shadow {
        box-shadow: 0px 0px 5px -2px var(--dl-color-theme-neutral-dark);
      }

      .thq-grid-3 {
        display: grid;
        grid-gap: var(--dl-layout-space-twounits);
        grid-template-columns: 1fr 1fr 1fr;
      }

      .thq-grid-4 {
        display: grid;
        grid-gap: var(--dl-layout-space-twounits);
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }

      .thq-grid-2 {
        width: 100%;
        display: grid;
        grid-gap: var(--dl-layout-space-twounits);
        grid-template-columns: 1fr 1fr;
      }

      .thq-checkbox {
        width: var(--dl-layout-size-xsmall);
        height: var(--dl-layout-size-xsmall);
      }

      .thq-select {
        cursor: pointer;
        appearance: none;
        padding-top: var(--dl-layout-space-halfunit);
        padding-left: var(--dl-layout-space-unit);
        border-radius: var(--dl-layout-radius-inputradius);
        padding-right: var(--dl-layout-space-twounits);
        padding-bottom: var(--dl-layout-space-halfunit);
        background-color: var(--dl-color-theme-neutral-light);
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg width%3D%2220%22 height%3D%2220%22 xmlns%3D%22http%3A//www.w3.org/2000/svg%22 viewBox%3D%220 0 20 20%22 fill%3D%22%23000%22%3E%3Cpath d%3D%22M4.293 7.293a1 1 0 011.414 0L10 11.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z%22/%3E%3C/svg%3E');
        background-repeat: no-repeat;
        background-position: right 8px center;
      }

      .thq-divider-horizontal {
        width: 100%;
        height: 1px;
        background-color: var(--dl-color-theme-neutral-dark);
      }

      .thq-icon-small {
        width: 24px;
        height: 24px;
      }

      .thq-button-icon {
        fill: var(--dl-color-theme-secondary1);
        padding: 3px;
        transition: 0.3s;
        border-radius: var(--dl-layout-radius-round);
      }

      .thq-button-icon:hover {
        fill: var(--dl-color-theme-secondary2);
      }

      .thq-icon-medium {
        width: var(--dl-layout-size-small);
        height: var(--dl-layout-size-small);
      }

      .thq-icon-x-small {
        width: var(--dl-layout-size-xsmall);
        height: var(--dl-layout-size-xsmall);
      }

      .thq-link {
        cursor: pointer;
        display: inline-block;
        overflow: hidden;
        background: linear-gradient(to right, var(--dl-color-theme-primary1) 50%, var(--dl-color-theme-neutral-dark) 50%);
        transition: background-position 300ms ease;
        font-weight: 600;
        background-clip: text;
        background-size: 200% 100%;
        background-position: 100%;
        -webkit-text-fill-color: transparent;
      }

      .thq-link:hover {
        background-position: 0 100%;
      }

      .thq-grid-auto-300 {
        display: grid;
        grid-gap: var(--dl-layout-space-oneandhalfunits);
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      }

      .thq-animated-group-vertical-reverse {
        gap: var(--dl-layout-space-unit);
        width: 100%;
        display: flex;
        animation: scroll-y 20s linear infinite;
        align-items: flex-start;
        flex-direction: column;
        justify-content: space-around;
        animation-direction: reverse;
      }

      .thq-animated-group-horizontal-reverse {
        gap: var(--dl-layout-space-unit);
        display: flex;
        animation: scroll-x 20s linear infinite;
        min-width: 100%;
        align-items: center;
        flex-shrink: 0;
        justify-content: space-around;
        animation-direction: reverse;
      }

      .thq-animated-group-vertical {
        gap: var(--dl-layout-space-unit);
        width: 100%;
        display: flex;
        animation: scroll-y 20s linear infinite;
        align-items: flex-start;
        flex-direction: column;
        justify-content: space-around;
      }

      .thq-animated-group-horizontal {
        gap: var(--dl-layout-space-unit);
        display: flex;
        animation: scroll-x 20s linear infinite;
        min-width: 100%;
        align-items: center;
        flex-shrink: 0;
        justify-content: space-around;
      }

      .thq-animated-group-container-vertical {
        gap: var(--dl-layout-space-unit);
        display: flex;
        overflow: hidden;
        flex-direction: column;
      }

      .thq-animated-group-container-horizontal {
        gap: var(--dl-layout-space-unit);
        display: flex;
        overflow: hidden;
      }

      .thq-mask-image-vertical {
        mask-image: linear-gradient(to bottom, transparent, black 1%, black 99%, transparent);
      }

      .thq-mask-image-horizontal {
        mask-image: linear-gradient(to right, transparent, black 1%, black 99%, transparent);
      }

      .thq-img-scale {
        transition: 0.3s;
      }

      .thq-img-scale:hover {
        scale: 1.05;
      }

      .thq-animated-card-bg-1 {
        width: 100%;
        height: 100%;
        transition: transform 0.3s;
        border-radius: var(--dl-layout-radius-cardradius);
        background-color: var(--dl-color-theme-accent1);
      }

      .thq-animated-card-bg-2 {
        transition: transform 0.3s;
        border-radius: var(--dl-layout-radius-cardradius);
        background-color: var(--dl-color-theme-accent2);
      }

      .thq-button-animated {
        outline: none;
        z-index: 1;
        overflow: hidden;
        position: relative;
        border-width: 2px;
      }

      .thq-input::placeholder {
        text-align: center;
        vertical-align: middle;
      }

      .thq-animated-group-container-vertical:hover div {
        animation-play-state: paused;
      }

      .thq-animated-group-container-horizontal:hover div {
        animation-play-state: paused;
      }

      .thq-animated-card-bg-2:has([data-animated="true"]:hover) {
        transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(3deg) skew(0deg, 0deg);
      }

      .thq-animated-card-bg-1:has([data-animated="true"]:hover) {
        transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-6deg) skew(0deg, 0deg);
      }

      .thq-button-animated:before {
        top: 0;
        left: -20%;
        color: var(--dl-color-theme-neutral-light);
        width: 200%;
        height: 101%;
        content: "";
        z-index: 1;
        position: absolute;
        transform: scaleX(0);
        transition: transform 0.5s;
        border-radius: var(--dl-layout-radius-buttonradius);
        background-color: var(--dl-color-theme-neutral-dark);
        transform-origin: 0 0;
        transition-timing-function: cubic-bezier(0.5, 1.6, 0.4, 0.7);
      }

      .thq-button-animated:hover::before {
        color: var(--dl-color-theme-neutral-light);
        z-index: -1;
        transform: scaleX(1);
      }

      .Content {
        font-size: 16px;
        font-family: Inter;
        font-weight: 400;
        line-height: 1.15;
        text-transform: none;
        text-decoration: none;
      }

      .ButtonText {
        font-size: 14px;
        font-style: normal;
        font-family: Poppins;
        font-weight: 700px;
        font-stretch: normal;
        letter-spacing: 0.005em;
      }

      .H1 {
        font-size: 38px;
        font-style: normal;
        font-family: Poppins;
        font-weight: 700px;
        font-stretch: normal;
        letter-spacing: 0.005em;
      }

      /* Email-specific styles from index.css */
      .email-container1 {
        width: 100%;
        display: flex;
        overflow: auto;
        min-height: 100vh;
        align-items: flex-start;
        flex-direction: column;
        background-color: #ffffff;
        padding: 0;
      }

      .email-email {
        width: 100%;
        height: auto;
        min-height: 100vh;
        display: flex;
        overflow: hidden;
        position: relative;
        align-items: flex-start;
        flex-direction: column;
        flex-shrink: 0;
        background-color: rgba(255, 255, 255, 1);
        margin: 0 auto;
      }

      .email-hero-section {
        top: 0px;
        left: 0px;
        right: 0px;
        width: 100%;
        height: 540px;
        display: flex;
        overflow: hidden;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 0;
        background-color: rgba(255, 255, 255, 1);
      }

      .email-svg630a7141ece7db03ecfa443dblue20hero20linessvg {
        top: 0px;
        left: 12%;
        width: 88%;
        height: 211px;
        position: absolute;
      }

      .email-group1 {
        top: 391px;
        right: 0;
        width: 216.5084228515625px;
        height: 148.84957885742188px;
        display: flex;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 1;
      }

      .email-vector2 {
        top: 0px;
        left: 2.560546875px;
        width: 214px;
        height: 149px;
        position: absolute;
      }

      .email-vector3 {
        top: 82.81941986083984px;
        left: 0px;
        width: 60px;
        height: 60px;
        position: absolute;
      }

      .email-svg63616ed62f82dd2359b97e0bwhyworkwithusbgshapebot {
        top: -107.5634765625px;
        left: -130px;
        width: 322px;
        height: 281px;
        position: absolute;
      }

      .email-group68 {
        top: 92px;
        left: 50%;
        transform: translateX(-50%);
        width: 250.00025939941406px;
        height: 246.73439025878906px;
        display: flex;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 1;
      }

      .email-mask-group {
        top: 0px;
        left: 0px;
        width: 246.73439025878906px;
        height: 246.73439025878906px;
        display: flex;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 1;
      }

      .email-ellipse97 {
        top: 0px;
        left: 0px;
        width: 247px;
        height: 247px;
        position: absolute;
        border-color: rgba(45, 6, 67, 1);
        border-style: solid;
        border-width: 1.0885341167449951px;
      }

      .email-ellipse96 {
        top: 17.779380798339844px;
        left: 17.779388427734375px;
        width: 211px;
        height: 211px;
        position: absolute;
      }

      .email-andrea {
        top: 17px;
        left: 15px;
        width: 211px;
        height: 211px;
        position: absolute;
      }

      .email-ellipse98 {
        top: 32.65601348876953px;
        left: 32.65602111816406px;
        width: 181px;
        height: 181px;
        position: absolute;
        border-color: rgba(134, 55, 147, 1);
        border-style: solid;
        border-width: 2.1770682334899902px;
      }

      .email-ellipse85 {
        top: 36.2841796875px;
        left: 23.5849609375px;
        width: 15px;
        height: 15px;
        position: absolute;
      }

      .email-ellipse86 {
        top: 130.26171875px;
        left: 241.2919921875px;
        width: 9px;
        height: 9px;
        position: absolute;
      }

      .email-ellipse87 {
        top: 224.23828125px;
        left: 54.0634765625px;
        width: 9px;
        height: 9px;
        position: absolute;
      }

      .email-group93 {
        top: 207.7285919189453px;
        left: 157.474609375px;
        width: 90.71117401123047px;
        height: 28.62245750427246px;
        display: flex;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 1;
        background-color: rgba(255, 255, 255, 1);
      }

      .email-text10 {
        top: 10.271484375px;
        left: 34.525390625px;
        color: rgba(134, 55, 147, 1);
        height: auto;
        position: absolute;
        font-size: 5.5px;
        font-style: Medium;
        text-align: left;
        font-family: Poppins;
        font-weight: 500;
        line-height: normal;
        font-stretch: normal;
        text-decoration: none;
      }

      .email-fastcharge1 {
        top: 0px;
        left: 3.62890625px;
        width: 29.035987854003906px;
        height: 28.62118911743164px;
        display: flex;
        overflow: hidden;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 0;
      }

      .email-fast-charging {
        top: 6.7080078125px;
        left: 1.814453125px;
        width: 25.406190872192383px;
        height: 15.20500659942627px;
        display: flex;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 1;
      }

      .email-vector4 {
        top: 0px;
        left: 1.814453125px;
        width: 24px;
        height: 15px;
        position: absolute;
      }

      .email-vector5 {
        top: 6.708087921142578px;
        left: 0.0000019073486328125px;
        width: 3px;
        height: 2px;
        position: absolute;
      }

      .email-group2 {
        top: 10.513671875px;
        left: 15.4072265625px;
        width: 8.888567924499512px;
        height: 7.737744331359863px;
        display: flex;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 1;
      }

      .email-group3 {
        top: 1.189453125px;
        left: 0.755859375px;
        width: 6.454993724822998px;
        height: 6.233336925506592px;
        display: flex;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 1;
      }

      .email-vector6 {
        top: 0px;
        left: 0.8798828125px;
        width: 6px;
        height: 5px;
        position: absolute;
      }

      .email-vector7 {
        top: 2.505859375px;
        left: 0px;
        width: 4px;
        height: 4px;
        position: absolute;
      }

      .email-group4 {
        top: 0px;
        left: 0px;
        width: 8.888567924499512px;
        height: 7.737744331359863px;
        display: flex;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 1;
      }

      .email-vector8 {
        top: 6.91796875px;
        left: 3.62109375px;
        width: 1px;
        height: 1px;
        position: absolute;
      }

      .email-vector9 {
        top: 0px;
        left: 0px;
        width: 9px;
        height: 4px;
        position: absolute;
      }

      .email-polygon2 {
        top: 192.10546875px;
        left: 97.197265625px;
        width: 20px;
        height: 20px;
        position: absolute;
      }

      .email-ellipse7 {
        top: 106px;
        left: 31px;
        width: 14px;
        height: 14px;
        position: absolute;
      }

      .email-ellipse81 {
        top: 126px;
        left: 461px;
        width: 9px;
        height: 9px;
        position: absolute;
      }

      .email-group45 {
        top: 260.96875px;
        left: 398.779296875px;
        width: 24.376188278198242px;
        height: 23.940589904785156px;
        display: flex;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 1;
      }

      .email-ellipse82 {
        top: 0px;
        left: 0px;
        width: 17px;
        height: 17px;
        position: absolute;
        border-color: rgba(204, 214, 0, 1);
        border-style: solid;
        border-width: 4px;
      }

      .email-vector1 {
        top: 10.161132514422434px;
        left: 7.4902345710991085px;
        width: 15px;
        height: 15px;
        position: absolute;
        box-shadow: 0px 4px 10px 0px rgba(68, 71, 164, 0.4000000059604645) ;
      }

      .email-rectangle10 {
        top: 59.884765625px;
        left: 372.390625px;
        width: 17px;
        height: 17px;
        position: absolute;
        border-color: rgba(128, 140, 255, 1);
        border-style: solid;
        border-width: 4px;
      }

      .email-text11 {
        top: 358px;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(25, 25, 25, 1);
        width: 80%;
        max-width: 477px;
        height: auto;
        position: absolute;
        font-size: 24px;
        font-style: Bold;
        text-align: center;
        font-family: Poppins;
        font-weight: 700;
        line-height: 42px;
        font-stretch: normal;
        text-decoration: none;
      }

      .email-text12 {
        top: 414px;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(147, 147, 147, 1);
        width: 62%;
        max-width: 375px;
        height: auto;
        position: absolute;
        font-size: 14px;
        font-style: Regular;
        text-align: center;
        font-family: Poppins;
        font-weight: 400;
        line-height: 24px;
        font-stretch: normal;
        text-decoration: none;
      }

      .email-button-l1 {
        top: 478px;
        left: 50%;
        transform: translateX(-50%);
        width: 159px;
        height: 52px;
        display: flex;
        padding: 14px 40px;
        overflow: hidden;
        position: absolute;
        align-items: center;
        flex-shrink: 0;
        border-radius: 45px;
        justify-content: center;
        background-color: rgba(21, 214, 231, 0.800000011920929);
        border: none;
        cursor: pointer;
      }

      .email-button-text1 {
        width: 79px;
        height: 24px;
        display: flex;
        position: relative;
        align-items: flex-start;
        flex-shrink: 1;
      }

      .email-text13 {
        color: var(--dl-color-default-white);
        height: auto;
        position: absolute;
        text-align: center;
        line-height: 24px;
      }

      .email-group104 {
        top: 117px;
        left: 50%;
        transform: translateX(-50%);
        width: 145.13787841796875px;
        height: 164.33932495117188px;
        display: flex;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 1;
      }

      .email-frame10 {
        top: 0px;
        left: 0px;
        width: 145.13787841796875px;
        height: 164.33932495117188px;
        display: flex;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 0;
      }

      .email-ellipse93 {
        top: 31.02734375px;
        left: 4.6015625px;
        width: 134px;
        height: 134px;
        position: absolute;
      }

      .email-maskgroup {
        top: 1.6328125px;
        left: 0.2021484375px;
        width: 144px;
        height: 163px;
        display: flex;
        position: absolute;
        align-items: flex-start;
        flex-shrink: 1;
      }

      .email-ellipse92 {
        top: 0px;
        left: 0px;
        width: 144px;
        height: 163px;
        position: absolute;
      }

      .email-happyrobot3daicharacterchatbotmascotgptchatboticon {
        top: 43px;
        left: 14px;
        width: 117px;
        height: 117px;
        position: absolute;
      }

      .email-image {
        top: 1062px;
        left: 0;
        right: 0;
        width: 100%;
        height: 120px;
        position: absolute;
        object-fit: cover;
      }

      .email-group103 {
        display: none;
      }

      .email-call-to-action-variant3 {
        display: none;
      }

      .email-button-l2 {
        width: 163px;
        height: 52px;
        display: flex;
        padding: 14px 40px;
        overflow: hidden;
        position: relative;
        align-items: center;
        flex-shrink: 0;
        border-radius: 45px;
        justify-content: center;
        background-color: rgba(134, 55, 147, 1);
        border: none;
        cursor: pointer;
      }

      .email-button-text2 {
        width: 83px;
        height: 24px;
        display: flex;
        position: relative;
        align-items: flex-start;
        flex-shrink: 1;
      }

      .email-text14 {
        color: var(--dl-color-default-white);
        height: auto;
        position: absolute;
        text-align: center;
        line-height: 24px;
      }

      .email-text15 {
        top: 78px;
        left: 50%;
        transform: translateX(-50%);
        color: var(--dl-color-default-black);
        width: 80%;
        max-width: 480px;
        height: auto;
        position: absolute;
        text-align: center;
        line-height: 48px;
      }

      .email-text16 {
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(41, 45, 50, 1);
        width: 80%;
        max-width: 480px;
        height: auto;
        position: absolute;
        font-size: 16px;
        font-style: Bold;
        text-align: center;
        font-family: Poppins;
        font-weight: 700;
        line-height: 18px;
        font-stretch: normal;
        text-decoration: none;
      }

      .email-text17 {
        color: rgba(41, 45, 50, 1);
      }

      .email-text18 {
        color: rgba(255, 255, 255, 1);
      }

      .email-content-wrapper {
        width: 100%;
        margin-top: 540px;
        position: relative;
        display: flex;
        flex-direction: column;
      }

      .email-cta-section {
        width: 100%;
        padding: 40px 20px;
        background-color: rgba(4, 246, 241, 0.8);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        min-height: 200px;
      }

      .email-cta-section button {
        margin-bottom: 10px;
      }

      .email-cta-section .email-text15 {
        position: static;
        transform: none;
        margin: 10px 0;
      }

      .email-cta-section .email-text16 {
        position: static;
        transform: none;
        margin: 0;
      }

      .email-credentials-section {
        width: 100%;
        padding: 40px 45px;
        background-color: #f8f8f8;
        display: flex;
        flex-direction: column;
        gap: 20px;
        min-height: 150px;
      }

      .email-credentials-section .email-text20,
      .email-credentials-section .email-text21 {
        position: static;
        transform: none;
        width: 100%;
        max-width: 100%;
      }

      .email-rectangle {
        display: none;
      }

      .email-text20 {
        top: 571px;
        left: 45px;
        color: rgba(83, 83, 83, 1);
        width: 64px;
        height: auto;
        position: absolute;
        font-size: 14px;
        font-style: Regular;
        text-align: left;
        font-family: Poppins;
        font-weight: 400;
        line-height: 26px;
        font-stretch: normal;
        text-decoration: none;
      }

      .email-text21 {
        top: 626px;
        left: 45px;
        right: 45px;
        color: rgba(147, 147, 147, 1);
        width: calc(100% - 90px);
        max-width: 508px;
        height: auto;
        position: absolute;
        font-size: 14px;
        font-style: Regular;
        text-align: left;
        font-family: Poppins;
        font-weight: 400;
        line-height: 26px;
        font-stretch: normal;
        text-decoration: none;
      }

      .email-rectangle460 {
        top: 980px;
        left: 0px;
        right: 0px;
        width: 100%;
        height: 180px;
        position: absolute;
        background-color: #f0f0f0;
      }

      .email-frame5881 {
        top: 1005px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 462px;
        height: 131px;
        display: flex;
        position: absolute;
        align-items: flex-start;
      }

      .email-component {
        gap: 32px;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
        width: 174px;
        display: flex;
        position: absolute;
        align-items: flex-start;
      }

      .email-social-icons {
        gap: 32px;
        display: flex;
        overflow: hidden;
        align-items: center;
      }

      .email-twitter {
        width: 18px;
        height: 18px;
      }

      .email-facebook {
        width: 18px;
        height: 18px;
      }

      .email-instagram {
        width: 18px;
        height: 18px;
        display: flex;
        overflow: hidden;
        position: relative;
        align-items: flex-start;
        flex-shrink: 0;
      }

      .email-union {
        top: 0px;
        left: 0px;
        width: 18px;
        height: 18px;
        position: absolute;
      }

      .email-frame {
        width: 24px;
        height: 24px;
      }

      .email-frame5882 {
        gap: 18px;
        top: 24px;
        left: 0px;
        width: 100%;
        max-width: 462px;
        height: 107px;
        display: flex;
        position: absolute;
        align-items: flex-start;
      }

      .email-text22 {
        color: rgba(129, 129, 129, 1);
        height: auto;
        position: absolute;
        font-size: 14px;
        font-style: SemiBold;
        text-align: left;
        font-family: Nunito;
        font-weight: 600;
        line-height: 160.0000023841858%;
        font-stretch: normal;
        text-decoration: none;
      }

      .email-text23 {
        color: rgba(129, 129, 129, 1);
        font-weight: 600;
      }

      .email-text25 {
        color: rgba(129, 129, 129, 1);
        font-weight: 600;
      }

      .email-text27 {
        color: rgba(129, 129, 129, 1);
        font-weight: 600;
      }

      .email-logo-horizontal1 {
        top: 73px;
        left: 50%;
        transform: translateX(-50%);
        width: 82px;
        height: 22px;
        position: absolute;
      }


      /* Responsive Design */
      @media(min-width: 1200px) {
        .email-email {
          max-width: 1200px;
        }
      }

      @media(min-width: 768px) and (max-width: 1199px) {
        .email-email {
          max-width: 100%;
        }
      }

      @media(max-width: 991px) {
        .thq-grid-4 {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }

      @media(max-width: 767px) {
        .email-email {
          max-width: 100%;
        }
        
        .email-cta-section {
          padding: 30px 15px;
        }
        
        .email-credentials-section {
          padding: 30px 25px;
        }
        .thq-section-padding {
          padding: var(--dl-layout-space-threeunits);
        }
        .thq-flex-column {
          gap: var(--dl-layout-space-oneandhalfunits);
        }
        .thq-flex-row {
          gap: var(--dl-layout-space-oneandhalfunits);
        }
        .thq-grid-6 {
          grid-gap: var(--dl-layout-space-oneandhalfunits);
          grid-template-columns: 1fr 1fr 1fr;
        }
        .thq-grid-5 {
          grid-gap: var(--dl-layout-space-oneandhalfunits);
          grid-template-columns: 1fr 1fr 1fr;
        }
        .thq-card {
          padding: var(--dl-layout-space-oneandhalfunits);
        }
        .thq-grid-3 {
          grid-gap: var(--dl-layout-space-oneandhalfunits);
          grid-template-columns: 1fr 1fr;
        }
        .thq-grid-4 {
          grid-gap: var(--dl-layout-space-oneandhalfunits);
          flex-direction: row;
          grid-template-columns: 1fr 1fr;
        }
        .thq-grid-2 {
          grid-gap: var(--dl-layout-space-oneandhalfunits);
          grid-template-columns: 1fr;
        }
        .thq-img-scale {
          width: 100%;
        }
      }

      @media(max-width: 479px) {
        .email-text11 {
          font-size: 20px;
          line-height: 32px;
        }
        
        .email-text12 {
          font-size: 12px;
          line-height: 20px;
        }
        
        .email-cta-section {
          padding: 20px 10px;
          min-height: 180px;
        }
        
        .email-credentials-section {
          padding: 20px 15px;
        }
        
        .email-text15 {
          font-size: 28px !important;
        }
        
        .email-text16 {
          font-size: 14px !important;
        }
        
        .thq-section-padding {
          padding: var(--dl-layout-space-oneandhalfunits);
        }
        .thq-flex-column {
          gap: var(--dl-layout-space-unit);
        }
        .thq-flex-row {
          gap: var(--dl-layout-space-unit);
        }
        .thq-grid-6 {
          grid-gap: var(--dl-layout-space-unit);
          grid-template-columns: 1fr 1fr;
        }
        .thq-grid-5 {
          grid-gap: var(--dl-layout-space-unit);
          grid-template-columns: 1fr 1fr;
        }
        .thq-grid-3 {
          grid-gap: var(--dl-layout-space-unit);
          align-items: center;
          grid-template-columns: 1fr;
        }
        .thq-grid-4 {
          grid-gap: var(--dl-layout-space-unit);
          align-items: center;
          flex-direction: column;
          grid-template-columns: 1fr;
        }
        .thq-grid-2 {
          grid-gap: var(--dl-layout-space-unit);
        }
        .thq-grid-auto-300 {
          grid-template-columns: 1fr;
        }
      }
    </style>
    <link
      rel="stylesheet"
      href="https://unpkg.com/animate.css@4.1.1/animate.css"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap"
      data-tag="font"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&amp;display=swap"
      data-tag="font"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap"
      data-tag="font"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap"
      data-tag="font"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap"
      data-tag="font"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap"
      data-tag="font"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/@teleporthq/teleport-custom-scripts/dist/style.css"
    />
  </head>
  <body>
    <div>
      <div class="email-container1">
        <div class="email-email">
          <div class="email-hero-section">
            <img
              src="public/svg630a7141ece7db03ecfa443dblue20hero20linessvg1081-yimu.svg"
              alt="SVG630a7141ece7db03ecfa443dblue20hero20linessvg1081"
              class="email-svg630a7141ece7db03ecfa443dblue20hero20linessvg"
            />
            <div class="email-group1">
              <img
                src="public/vector1081-5yvo.svg"
                alt="Vector1081"
                class="email-vector2"
              />
              <img
                src="public/vector1081-z49.svg"
                alt="Vector1081"
                class="email-vector3"
              />
            </div>
            <img
              src="public/svg63616ed62f82dd2359b97e0bwhyworkwithusbgshapebot1081-g5q4q.svg"
              alt="SVG63616ed62f82dd2359b97e0bwhyworkwithusbgshapebot1081"
              class="email-svg63616ed62f82dd2359b97e0bwhyworkwithusbgshapebot"
            />
            <div class="email-group68">
              <div class="email-mask-group">
                <img
                  src="public/ellipse971081-xwwh-300h.png"
                  alt="Ellipse971081"
                  class="email-ellipse97"
                />
                <img
                  src="public/ellipse961081-6eqh-300h.png"
                  alt="Ellipse961081"
                  class="email-ellipse96"
                />
                <img
                  src="public/andrea1081-4jq-300w.png"
                  alt="andrea1081"
                  class="email-andrea"
                />
                <img
                  src="public/ellipse981081-gby-200h.png"
                  alt="Ellipse981081"
                  class="email-ellipse98"
                />
              </div>
              <img
                src="public/ellipse851081-3p4y-200h.png"
                alt="Ellipse851081"
                class="email-ellipse85"
              />
              <img
                src="public/ellipse861081-7map-200h.png"
                alt="Ellipse861081"
                class="email-ellipse86"
              />
              <img
                src="public/ellipse871081-7rz-200h.png"
                alt="Ellipse871081"
                class="email-ellipse87"
              />
              <div class="email-group93">
                <span class="email-text10">Automate yourself</span>
                <div class="email-fastcharge1">
                  <div class="email-fast-charging">
                    <img
                      src="public/vector1081-hyly.svg"
                      alt="Vector1081"
                      class="email-vector4"
                    />
                    <img
                      src="public/vector1081-wzl.svg"
                      alt="Vector1081"
                      class="email-vector5"
                    />
                  </div>
                  <div class="email-group2">
                    <div class="email-group3">
                      <img
                        src="public/vector1081-prqh.svg"
                        alt="Vector1081"
                        class="email-vector6"
                      />
                      <img
                        src="public/vector1081-k3pk.svg"
                        alt="Vector1081"
                        class="email-vector7"
                      />
                    </div>
                    <div class="email-group4">
                      <img
                        src="public/vector1081-jfvd.svg"
                        alt="Vector1081"
                        class="email-vector8"
                      />
                      <img
                        src="public/vector1081-r3e.svg"
                        alt="Vector1081"
                        class="email-vector9"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              src="public/polygon21081-lt7c.svg"
              alt="Polygon21081"
              class="email-polygon2"
            />
            <img
              src="public/ellipse71081-6rbj-200h.png"
              alt="Ellipse71081"
              class="email-ellipse7"
            />
            <img
              src="public/ellipse81081-my7v-200h.png"
              alt="Ellipse81081"
              class="email-ellipse81"
            />
            <div class="email-group45">
              <img
                src="public/ellipse81081-4bhd-200h.png"
                alt="Ellipse81081"
                class="email-ellipse82"
              />
              <img
                src="public/vector11081-1m2l.svg"
                alt="Vector11081"
                class="email-vector1"
              />
            </div>
            <div class="email-rectangle10"></div>
            <span class="email-text11">Welcome, ${full_name}!</span>
            <span class="email-text12">
              Your account has been successfully created. We're excited to have you on board!
            </span>
            <button class="email-button-l1">
              <div class="email-button-text1">
                <span class="email-text13 ButtonText">Verify Now</span>
              </div>
            </button>
            <div class="email-group104">
              <div class="email-frame10">
                <img
                  src="public/ellipse931081-uw9-200h.png"
                  alt="Ellipse931081"
                  class="email-ellipse93"
                />
                <div class="email-maskgroup">
                  <img
                    src="public/ellipse921081-5c2-200h.png"
                    alt="Ellipse921081"
                    class="email-ellipse92"
                  />
                </div>
                <img
                  src="public/happyrobot3daicharacterchatbotmascotgptchatboticon1091-hyai-200h.png"
                  alt="happyrobot3daicharacterchatbotmascotgptchatboticon1091"
                  class="email-happyrobot3daicharacterchatbotmascotgptchatboticon"
                />
              </div>
            </div>
          </div>
          
          <!-- Dynamic Content Wrapper -->
          <div class="email-content-wrapper">
            <!-- Section 1: User Credentials -->
            <div class="email-credentials-section">
              <span class="email-text20">Hi ${full_name},</span>
              <span class="email-text21">
                Your account has been successfully created! Here are your login credentials:<br/><br/>
                <strong>Email:</strong> ${email}<br/>
                <strong>Password:</strong> ${password}<br/><br/>
                Please keep this information secure and change your password after your first login for security purposes.
              </span>
            </div>
            
            <!-- Section 2: Get Started CTA -->
            <div class="email-cta-section">
              <span class="email-text15 H1">Activate Your Account</span>
              <span class="email-text16">
                <span class="email-text17">Get started with</span>
                <span class="email-text18"></span>
                <span>Duha Nashrah.AI today!</span>
              </span>
              <button class="email-button-l2">
                <div class="email-button-text2">
                  <span class="email-text14 ButtonText">Login Now</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Keep old elements hidden for compatibility -->
          <img
            src="public/image1081-f6f-600w.png"
            alt="IMAGE1081"
            class="email-image"
            style="display: none;"
          />
          <div class="email-group103">
            <div class="email-call-to-action-variant3"></div>
          </div>
          <div class="email-rectangle"></div>
          <div class="email-rectangle460"></div>
          <div class="email-frame5881">
            <div class="email-component">
              <div class="email-social-icons">
                <img
                  src="public/twitteri108-tn25.svg"
                  alt="TwitterI108"
                  class="email-twitter"
                />
                <img
                  src="public/facebooki108-lrjg.svg"
                  alt="FacebookI108"
                  class="email-facebook"
                />
                <div class="email-instagram">
                  <img
                    src="public/unioni108-gldl.svg"
                    alt="UnionI108"
                    class="email-union"
                  />
                </div>
              </div>
              <img
                src="public/framei108-xll.svg"
                alt="FrameI108"
                class="email-frame"
              />
            </div>
            <div class="email-frame5882">
              <span class="email-text22">
                <span class="email-text23"></span>
                <br />
                <span class="email-text25">
                  If you're having trouble clicking the "Get Started Here"
                  button, copy and
                </span>
                <br />
                <span class="email-text27">
                  paste the URL below into your web browser:
                </span>
                <span>https://app.chunk.africa</span>
              </span>
              <img
                src="public/logohorizontal11091-k5hn-200h.png"
                alt="LogoHorizontal11091"
                class="email-logo-horizontal1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

 
      `,
    };

    // ✅ Send Emails
    const owner = await transporter.sendMail(ownerMail);
    const sender = await transporter.sendMail(senderMail);

    return NextResponse.json("Email sent successfully" ,{status:200});
  } catch (error) {
    console.error("Email error:", error); // full error in server logs
  return NextResponse.json(
    { error: error.message || "Something went wrong" },
    { status: 500 }
  );
  }
}
