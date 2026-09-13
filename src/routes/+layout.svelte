<script>
  import '../app.css';

  let { children } = $props();

  const orgSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://Manner.com/#organization",
        "name": "Manner",
        "url": "https://Manner.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://Manner.com/logo.png"
        },
        "description": "Curated lifestyle and minimalist daily essentials with direct-to-consumer craft."
      },
      {
        "@type": "WebSite",
        "@id": "https://Manner.com/#website",
        "url": "https://Manner.com",
        "name": "Manner",
        "publisher": {
          "@id": "https://Manner.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://Manner.com/shop?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(orgSchema)}</script>`}
</svelte:head>

{@render children?.()}
