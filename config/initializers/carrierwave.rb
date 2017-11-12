CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: Rails.application.secrets.aws_access_key_id,
    aws_secret_access_key: Rails.application.secrets.aws_secret_access_key,
    region: Rails.application.secrets.aws_region,
    path_style: true
  }
  config.fog_public     = true # public-read

  config.remove_previously_stored_files_after_update = false

  config.fog_directory = Rails.application.secrets.aws_s3_bucket
  config.asset_host = Rails.application.secrets.aws_s3_url

end
CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/