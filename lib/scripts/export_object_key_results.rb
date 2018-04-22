require 'optparse'

options = {}

OptionParser.new { |opt|
  opt.banner("Usage: #{$0} [options]")
  opt.on('-org', '--organization', 'OKR出力対象組織を指定します。') { |v|
    options[:organization] = v
  }
  opt.on('-prd', '--period', 'OKR出力対象期間を指定します。') { |v|
    options[:period] = v
  }
}.parse(ARGV)

class ExportObjectKeyResuts
  def self.execute(organization, period)
    puts "{organization}, {period}"
  end
end


ExportObjectKeyResuts.execute(options[:organization], options[:period])