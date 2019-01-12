# frozen_string_literal: true

class AvatarUploader < ImageUploader
  def store_dir
    "avatar"
  end
end
