# -*- mode: ruby -*-
# vi: set ft=ruby :


Vagrant.configure("2") do |config|

  config.vm.box = "precise64"
  
  config.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/precise/current/precise-server-cloudimg-amd64-vagrant-disk1.box"

#run:   vagrant plugin install vagrant-hostmanager
#In windows '%WINDIR%\System32\drivers\etc\hosts' needs user privelages to execute 
  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.ignore_private_ip = false
  config.hostmanager.include_offline = true
  config.vm.define 'host.cals-box' do |node|
    node.vm.hostname = 'host.cals'
    node.vm.network :private_network, ip: '192.168.33.10'
    node.hostmanager.aliases = %w(host.cals)
  end

 #config.vm.hostname = "host.cals"
#config.vm.network :private_network, ip: "192.168.33.10"
#config.hostmanager.aliases = ["host.cals8"]
  
  
  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = "puppet/manifests"
    puppet.module_path = "puppet/modules"
    puppet.manifest_file  = "init.pp"
    puppet.options="--verbose --debug"
  end

  config.vm.provider "virtualbox" do |v|
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant-root", "1"]
  end
end
