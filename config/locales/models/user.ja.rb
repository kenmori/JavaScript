require_dependency Rails.root.join("config/locales/share/model_names")

user_attrs = {
  first_name: "ユーザ名(名)",
  last_name: "ユーザ名(姓)",
  email: "メールアドレス",
  admin: "管理者フラグ"
}

{
  ja: {
    activerecord: {
      attributes: {
        user: user_attrs
      }
    },
    activemodel: {
      attributes: {
        'user/create': {
          **user_attrs,
          skip_notification: "メール認証スキップ",
          department_ids: "#{model_names[:department]}ID"
        },
      },
      errors: {
        models: {
          'user/create': {
          }
        }
      }
    }
  }
}
