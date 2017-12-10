CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: ENV.fetch("AWS_ACCESS_KEY_ID") { 'access_key_id' },
    aws_secret_access_key: ENV.fetch("AWS_SECRET_ACCESS_KEY") { 'secret_key' },
    region: ENV.fetch("AWS_REGION") { 'ap-northeast-1' },
    host: ENV.fetch("AWS_S3_HOST") { 's3.amazonaws.com' },
    endpoint: ENV.fetch("AWS_S3_ENDPOINT") { nil },
    path_style: true
  }
  config.fog_public     = true # public-read

  config.remove_previously_stored_files_after_update = false

  config.fog_directory = ENV.fetch("AWS_S3_BUCKET") { 'image' }
  config.asset_host = ENV.fetch("AWS_S3_URL") { 'http://minio:9000/' }

end
CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/
