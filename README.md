# Astro-star Docs Deployment

This repository keeps the GitHub Pages deployment environment for the Astro-star documentation site:

<https://hanlife02.github.io/Astro-star-docs/>

The documentation source now lives in [`hanlife02/Astro-star/docs`](https://github.com/hanlife02/Astro-star/tree/main/docs). Edit and review documentation there.

## Deployment

Changes under `Astro-star/docs/` are checked in the main repository first. A successful documentation build starts this repository's Pages workflow with the source commit SHA. This repository then checks out that exact Astro-star revision, builds `docs/`, and publishes the result with GitHub Pages.

The Pages workflow can also be run manually. Its `source_sha` input accepts `main` or a full 40-character lowercase commit SHA.

The previous standalone documentation source remains available in this repository's Git history.

## License

The documentation site scaffold retains its original MIT license in [LICENSE](./LICENSE). Astro-star itself is licensed separately in the main repository.
