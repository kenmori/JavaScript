require 'carrierwave/storage/fog'

class ImageUploader < CarrierWave::Uploader::Base

  include CarrierWave::RMagick
  storage :fog

  process :crop
  process :resize_to_limit => [100, 100]

  def crop
    manipulate! do |img|
      gravity = Magick::CenterGravity
      crop_w = img.columns
      crop_h = img.rows
      if img.rows <= img.columns
        crop_w = img.rows
      else
        crop_h = img.columns
      end
      img.crop!(gravity, crop_w, crop_h)
      img = yield(img) if block_given?
      img
    end
  end

  def fog_attributes
    {
      'Content-Type' => 'image/jpg',
      'Cache-Control' => "max-age=#{1.week.to_i}"
    }
  end

  def store_dir
    "image"
  end

  def extension_white_list
    %w(jpg jpeg png)
  end

  def filename
    if original_filename.present?
      "#{model.id}_#{secure_token}.#{file.extension}"
    end
  end

  def size_range
    1..5.megabytes
  end

  protected

  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end

end