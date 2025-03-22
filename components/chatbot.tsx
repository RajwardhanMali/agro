"use client";

import React, { Component } from "react";

declare global {
  interface Window {
    kommunicate: any;
  }
}

class KomunicateChat extends Component {
  constructor(props: {}) {
    super(props);
  }

  componentDidMount() {
    (function (d, m) {
      var kommunicateSettings = {
        appId: process.env.NEXT_PUBLIC_KOMMUNICATE_APP_ID,
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }

  render() {
    return <div></div>;
  }
}

export default KomunicateChat;
