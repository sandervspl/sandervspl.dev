type Props = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
};

export function Head({
  children,
  title = 'Sander Vispoel',
  description = 'Sander Vispoel is a fullstack developer from The Netherlands.',
}: Props) {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐠</text></svg>"
      />
      {/* <script>
				{`window.va =
            window.va ||
            function () {
              (window.vaq = window.vaq || []).push(arguments);
            };
          `}
			</script> */}
      <script
        defer
        data-domain="sandervspl.dev"
        src="https://plausible.sandervspl.dev/js/script.js"
      />
      {children}
    </head>
  );
}
