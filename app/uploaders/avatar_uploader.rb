require 'carrierwave/storage/fog'

class AvatarUploader < CarrierWave::Uploader::Base

  storage :fog # fog使いますよー

  # cash使います。
  def fog_attributes
    {
      'Content-Type' =>  'image/jpg',
      'Cache-Control' => "max-age=#{1.week.to_i}"
    }
  end

  # バケット以下アイコンの保存先を指定します。
  # ~/[バケット名]/[foldername]　配下に画像がアップロードされます。
  def store_dir
    "avatar"
  end

  # アップロード可能な形式をここで指定します。
  # ちなみにアップロード不可な形式の指定はextension_black_list
  def extension_white_list
    %w(jpg jpeg png)
  end

  # アップロード時のファイル名を指定します。
  # アップロードしたファイルを一意に認識
  def filename
    if original_filename.present?
      "#{model.id}_#{secure_token}.#{file.extension}"
    end
  end

  protected
  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end

end