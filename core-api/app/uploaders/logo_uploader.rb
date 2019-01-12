# frozen_string_literal: true

class LogoUploader < ImageUploader
  def store_dir
    "logo"
  end
end
