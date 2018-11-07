require_dependency Rails.root.join('config/locales/share/model_names')

department_attrs = {
  display_order: "表示順",
  name: "部署名",
  organization_id: model_names[:organization]
}

{
  ja: {
    activerecord: {
      attributes: {
        department: department_attrs
      }
    },
    activemodel: {
      attributes: {
        'department/create': {
          **department_attrs,
          owner_id: "部署責任者",
          parent_department_id: "親部署"
        }
      },
      errors: {
        models: {
          'department/create': {
            attributes: {
              owner_id: {
                must_be_same_organization: "は組織内のユーザーにしてください"
              }
            }
          }
        }
      }
    }
  }
}
