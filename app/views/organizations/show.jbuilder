json.organization do
    json.partial!(@organization)
    json.members do
        json.array!(@organization.members) do |user|
          json.partial!(user)
        end
    end 
    json.okr_periods @organization.okr_periods.order(:month_start)
end
