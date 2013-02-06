APP_CONFIG = ENV
config_file_path = File.expand_path('../app_config.yml', __FILE__)
APP_CONFIG = YAML.load_file(config_file_path) if File.exists?(config_file_path)
