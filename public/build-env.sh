#!/bin/sh

ENV_FILE_PATH=.env
OUTPUT_PATH=./

if [ ${ENV_FILE} ]; then
  ENV_FILE_PATH=.env.${ENV_FILE}
fi

# Recreate config file
rm -rf "$OUTPUT_PATH"env-config.js
touch "$OUTPUT_PATH"env-config.js

# Add assignment
echo "window._env_ = {" >> "$OUTPUT_PATH"env-config.js

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [ -n "$line" ];
do
  varvalue=""
  value=""
  varname=""
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  if [ "$varname" = "" ]; then
    echo "" >> "$OUTPUT_PATH"env-config.js
  else
    # check thing
    eval "env_var=\${$varname}"
    # Read value of current variable if exists as Environment variable
    if [ "$env_var" = "" ]; then
      [ -z $value ] && value=${varvalue}
    else
      value=$env_var
    fi
#    # Otherwise use value from .env file
    echo "  $varname: '$value'," >> "$OUTPUT_PATH"env-config.js
  fi

done < "$ENV_FILE_PATH"

echo "};" >> "$OUTPUT_PATH"env-config.js

echo "output path: $OUTPUT_PATH"

echo "env file: $ENV_FILE"

cat "$OUTPUT_PATH"env-config.js

exec "$@"
