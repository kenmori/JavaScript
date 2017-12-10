CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: ENV.fetch("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key: ENV.fetch("AWS_SECRET_ACCESS_KEY"),
    region: ENV.fetch("AWS_REGION"),
    path_style: true
  }
  config.fog_public     = true # public-read

  config.remove_previously_stored_files_after_update = false

  config.fog_directory = ENV.fetch("AWS_S3_BUCKET")
  config.asset_host = ENV.fetch("AWS_S3_URL")

end
CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/