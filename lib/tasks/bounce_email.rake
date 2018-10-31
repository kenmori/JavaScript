namespace :bounce_email do
  desc "Register bounce email in SQS queue"
  task register: :environment do
    client = Aws::SQS::Client.new(
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_KEY'],
      region: ENV['AWS_REGION']
    )
    queue = client.receive_message(queue_url: ENV['AWS_SQS_QUEUE_URL'])
    if queue.messages.blank?
      puts "queue is empty, skip to the next time"
      next
    end

    queue.messages.each do |msg|
      body = JSON.parse(msg.body)
      bounce_info = JSON.parse(body)
      if bounce_info["bounce"]["bounceType"] == "Transient"
        puts "skip bounce queue. type: #{bounce_info['bounce']['bounceType']}"
        next
      end

      bounce_info["bounce"]["bouncedRecipients"].each do |recipient|
        bounce = BounceEmail.find_or_create_by(email: recipient["emailAddress"])
        bounce.update_attribute(:sent_at, Time.zone.parse(bounce_info["bounce"]["timestamp"]))
      end

      client.delete_message(queue_url: ENV['AWS_SQS_QUEUE_URL'], receipt_handle: msg.receipt_handle)
    end
  end
end
