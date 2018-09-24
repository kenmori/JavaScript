# frozen_string_literal: true

CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: "AWS",
    aws_access_key_id: ENV.fetch("AWS_ACCESS_KEY_ID", "access_key_id"),
    aws_secret_access_key: ENV.fetch("AWS_SECRET_KEY", "secret_key"),
    region: ENV.fetch("AWS_REGION", "ap-northeast-1"),
    host: ENV.fetch("MINIO_HOST", nil),
    endpoint: ENV.fetch("MINIO_ENDPOINT", nil),
    path_style: true
  }
  config.fog_provider = "fog/aws"
  config.fog_public = true
  config.remove_previously_stored_files_after_update = false
  config.fog_directory = ENV.fetch("AWS_S3_BUCKET", "resily")
  config.asset_host = "#{ENV.fetch('AWS_S3_URL', 'https://s3-ap-northeast-1.amazonaws.com/')}#{config.fog_directory}"
end
CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/
