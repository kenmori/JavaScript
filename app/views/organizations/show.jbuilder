json.organization do
    json.partial!(@organization)
    json.members do
        json.array!(@organization.members) do |user|
          json.partial!(user)
        end
    end 
    json.okr_periods do 
        json.array!(@organization.okr_periods.order(:month_start)) do |period|
            json.id period.id
            json.name period.name
            json.organization_id period.organization_id
            json.month_start period.month_start
            json.month_end period.month_end
        end
    end
end
