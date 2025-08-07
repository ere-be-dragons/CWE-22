# CWE-22

[CWE-22](https://cwe.mitre.org/data/definitions/22.html): Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')

## Guidance

1. Start up the application.
   ```shell
   docker run -it --rm -p 5000:5000 ghcr.io/ere-be-dragons/cwe-22:main
   ```
2. Optionally, use [ngrok](https://ngrok.com) to allow workshop participants to connect
   ```shell
   ngrok http 5000 --domain <your domain>
   ```
3. Visit the application on the local or remote domain
4. Use path traversal to get the local sqlite database.
5. See what else you can get.
