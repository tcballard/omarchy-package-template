# Develop the package

The included sample is a local Bash program with a complete recipe and real SHA-256 values. It is not a package for an external app and is not listed in Omarchy.

```bash
./tests/run
cd pkgbuilds/@@SLUG@@
makepkg --verifysource
makepkg --cleanbuild --force
```

The makepkg commands require Arch packaging tools and must run as a normal user. Review the recipe before running it: PKGBUILD is executable shell code. Use a clean Arch build environment before claiming package acceptance. Install with pacman -U only after inspecting the produced archive; remove with pacman -R @@SLUG@@. This sample has no user data or configuration.

The portable test executes this authored sample's check() and package() functions inside temporary srcdir/pkgdir directories and verifies the staged executable and licence. It is not equivalent to a clean makepkg build. When replacing the recipe with external code, review it before retaining that executable test.

For a real package:

1. Inspect the source, licence, upstream build/release process, dependencies and supported architecture.
2. Pin immutable sources and verify full downloads; never replace a failure with SKIP.
3. Keep runtime data outside package-owned files. Do not start services or download models during installation.
4. Add a verified upstream watch and current Omarchy metadata before submission.
5. Test clean build, install, launch, upgrade and removal; record actual results in acceptance evidence.

Changing local payload or licence bytes requires refreshing the matching source checksums. The initializer does this once; subsequent edits need normal packaging maintenance.
