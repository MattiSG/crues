# Notifier en cas de crues

Le site [vigicrues.gouv.fr](https://www.vigicrues.gouv.fr) est utile pour se documenter sur l'état courant des cours d'eau. Néanmoins, il ne permet pas aux personnes vivant en aval des stations d'être notifiées au dépassement d'un niveau arbitraire, ce qui correspond pourtant à leur besoin réel : connaître la hauteur d'une rivière sur les 30 derniers jours est utile, mais savoir qu'il leur reste 32 minutes avant que le rez-de-chaussée soit inondé, voilà qui change leur vie !

Cette application utilise l'[API hydrométrie](https://hubeau.eaufrance.fr/page/api-hydrometrie) pour suivre le niveau d'un cours d'eau et envoyer une notification lorsqu’un certain niveau est dépassé.

À l'état actuel, il s'agit d'une preuve de concept sans interface graphique pour modifier les valeurs limites et les destinataires.
