#!/bin/sh

# On s'assure que le dossier prisma existe (pour le volume)
mkdir -p /app/prisma

# Si le fichier dev.db n'existe pas, on initialise la base de données
if [ ! -f "/app/prisma/dev.db" ]; then
  echo "Base de données non trouvée. Initialisation..."
  # On utilise 'npx prisma db push' pour créer les tables sans migrations complexes pour commencer
  npx prisma db push
else
  echo "Base de données existante trouvée. Migration si nécessaire..."
  npx prisma db push
fi

# On lance l'application
exec "$@"
