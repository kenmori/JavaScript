# frozen_string_literal: true

guard :rspec, cmd: "bundle exec rspec" do
  watch("spec/spec_helper.rb")                        { "spec" }
  watch("spec/rails_helper.rb")                       { "spec" }
  watch("config/routes.rb")                           { "spec/routing" }
  watch("app/controllers/application_controller.rb")  { "spec/controllers" }
  watch(%r{^spec/support/.+\.rb$})                    { "spec" }
  watch(%r{^spec/.+_spec\.rb$})
  watch(%r{^app/(.+)\.rb$})                           { |m| "spec/#{m[1]}_spec.rb" }
  watch(%r{^app/views/(.*)/(.*)(\.erb|\.slim|\.jbuilder)$})   { |m| "spec/acceptance/#{m[1]}/#{m[2]}_spec.rb" }
  watch(%r{^lib/(.+)\.rb$})                           { |m| "spec/lib/#{m[1]}_spec.rb" }
  watch(%r{^app/controllers/(.+)_controller\.rb$})    { |m| Dir["spec/acceptance/#{m[1]}/*_spec.rb"] }
  watch(%r{^app/concepts/(.+)/(.+)\.rb$})             { |m| "spec/concepts/#{m[1]}/#{m[2]}_spec.rb" }
  watch(%r{^app/validations/(.+)\.rb$})               { |m| "spec/validations/#{m[1]}_spec.rb" }
end
