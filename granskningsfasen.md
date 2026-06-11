# Inlämning 3 - Granskningsfasen
Vi scannade koden med CodeQL, Dependabot och Secret scanning.

1. CodeQL
Hittade 6 sårbarheter, varav 5 berörde avsaknad rate limiting. Vi hade implementerat 3 instanser av rate limiting i fas 2, men missade några HTTP request handlers. Bör lösas genom att implementera en återanvändbar funktion som kan kallas varje gång en HTTP request görs. Kopplat till OWASP Top 10 berör detta A06, Insecure Design.  1 sårbarhet berörde en för tillåtande CORS-config (Cross-Origin Resource Sharing), vilket kan exponera känslig data för obehöriga, samt öppnar upp för CSRF-attacker (Cross-Site Request Forgery). Lösningen vi bedömt som enklast är att skapa en whitelist med betrodda domän, snarare än att tillåta alla (som i nuläget). I OWASP Top 10 klassificeras detta som A02, Security Misconfiguration.

2. Dependabot
Totalt 16 sårbarheter hittades av Dependabot. Alla kan i princip lösas av att uppdatera till den senaste versionen. Vi resonerar samtidigt att det är viktigt att se över vad som ändras i varje version -- för att säkerställa att funktioner som webappen förlitar sig på inte förändras eller försvinner, vilket i så fall skulle innebära ytterligare arbete med att skriva om koden. Med det sagt berör alla sårbarheter OWASP A03 Software Supply Chain Failures. De individuella sårbarheterna kan däremot kopplas till andra punkter i OWSASP Top 10. Istället för att översiktligt gå igenom alla 16 sårbarheter, valde vi att fokusera på 4 specifika sårbarheter:
- qs, remotely triggerable DoS via qs.stringify – A06 Insecure Design 
- node-tar, vulnerable to arbitrary file overwrite and symlink poisoning via insufficient path sanitization – A01 Broken Access Control
- vite, launch-editor, vulnerable to command injection via the crafted request on Windows – A05 Injection
- jsonwebtoken, unrestricted key type could lead to legacy keys usage – A04 Cryptographic Failure
