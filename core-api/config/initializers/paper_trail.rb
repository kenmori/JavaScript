# frozen_string_literal: true

PaperTrail.config.enabled = true
PaperTrail.config.has_paper_trail_defaults = {
  on: %i[update destroy]
}
PaperTrail.config.version_limit = nil
PaperTrail.serializer = PaperTrail::Serializers::JSON
