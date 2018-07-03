json.extract! organization, :id, :name, :logo, :okr_span

json.owner_id organization.owner&.id
