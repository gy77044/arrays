import * as React from "react";

function SvgPng(props:React.SVGProps<SVGSVGElement>) {
  return (
    <svg className="icon file-icon file-icon--png" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.607 24" {...props}>
      <path className="file-icon__shadow" d="M19.592 7.219v-.004c0-.014-.006-.026-.008-.039-.004-.03-.006-.06-.018-.089a.318.318 0 0 0-.055-.085c-.006-.008-.009-.017-.016-.025l-.002-.003-.003-.003-5.451-5.599-.001-.001a.338.338 0 0 0-.238-.102h-.001l-.005-.001H2.947a1.71 1.71 0 0 0-1.708 1.708v19.331a1.71 1.71 0 0 0 1.708 1.708h14.937a1.71 1.71 0 0 0 1.708-1.707V7.221v-.002z" />
      <path className="file-icon__outline" d="M18.354 5.951v-.004c0-.014-.006-.026-.008-.039-.004-.03-.006-.06-.018-.089a.318.318 0 0 0-.055-.085c-.006-.008-.009-.017-.016-.025l-.002-.003-.003-.003L12.801.104 12.8.103a.338.338 0 0 0-.238-.102h-.001L12.556 0H1.708A1.71 1.71 0 0 0 0 1.708v19.331a1.71 1.71 0 0 0 1.708 1.708h14.937a1.71 1.71 0 0 0 1.708-1.707V5.953l.001-.002zm-5.457-4.768l4.305 4.422h-4.305V1.183zm3.749 20.881H1.708c-.565 0-1.025-.46-1.025-1.025V1.708c0-.565.46-1.025 1.025-1.025h10.506v5.264c0 .189.153.342.342.342h5.115v14.75a1.027 1.027 0 0 1-1.025 1.025z" />
      <path className="file-icon__type" d="M5.773 15.424h-.991v1.031h-.661v-3.504c.551 0 1.101-.005 1.652-.005 1.711 0 1.716 2.478 0 2.478zm-.991-.606h.991c.846 0 .841-1.241 0-1.241h-.991v1.241zM9.854 12.946h.661v3.509h-.41v.005l-1.842-2.367v2.362h-.661v-3.504h.535l1.717 2.173v-2.178zM13.769 13.808a1.338 1.338 0 0 0-.891-.351c-.751 0-1.206.57-1.206 1.291 0 .576.335 1.172 1.206 1.172.275 0 .516-.061.791-.28v-.621h-.896v-.591h1.502v1.477c-.346.396-.781.631-1.396.631-1.316 0-1.852-.866-1.852-1.787 0-.985.615-1.896 1.852-1.896.471 0 .941.18 1.302.535l-.412.42z" />
    </svg>
  );
}

export default SvgPng;