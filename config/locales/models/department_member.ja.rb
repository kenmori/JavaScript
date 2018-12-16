require_dependency Rails.root.join("config/locales/share/model_names")

{
  ja: {
    activerecord: {
      attributes: {
        department_member: {
          role: '役割',
          department_id: "#{model_names[:department]}ID",
          department: model_names[:department],
          user_id: "#{model_names[:user]}ID",
          user: model_names[:user]
        }
      }
    }
  }
}
