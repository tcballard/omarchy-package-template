# Architecture

The recipe owns a local, architecture-independent Bash sample. source lists both payload and licence; the initializer calculates their SHA-256 values after rendering. package() writes only into pkgdir. There are no hooks, services, downloads or user-data mutations.

The .omarchy/package.json file declares a locally owned recipe. No upstream watch is invented for the local starter. Before submission for a real app, add its verified release watch under the current omacom/omarchy-pkgs contract and use the normal edge → rc → stable policy.

The default arch=any is valid only for this shell sample. Replace it with actual supported architectures when packaging compiled binaries. Package version, upstream version, pkgrel and source checksums must be reviewed together.
