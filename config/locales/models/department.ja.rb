require_dependency Rails.root.join('config/locales/share/model_names')

{
  ja: {
    activerecord: {
      attributes: {
        department: {
          display_order: "表示順",
          name: "部署名",
          organization: model_names[:organization]
        }
      }
    }
  }
}
