class grunt::install{
  
  # house keeping
  exec { 'apt-get update': 
    command => '/usr/bin/apt-get update',
  }

  package { 'curl':
    ensure => present,
    require => Exec['apt-get update'],
  }

  package { 'python-software-properties':
    ensure => present,
    require => Exec['apt-get update'],
  }

  package { 'ruby1.9.3':
    ensure => present,
    require => Exec['apt-get update'],
  }

  # Get node
  exec { 'add node repo':
    command => '/usr/bin/apt-add-repository ppa:chris-lea/node.js && /usr/bin/apt-get update',
    require => Package['python-software-properties'],
  }

  package { 'nodejs': 
    ensure => latest,
    require => [Exec['apt-get update'], Exec['add node repo']],
  }


  # install npm
  exec { 'npm':
    command => '/usr/bin/curl https://npmjs.org/install.sh | /bin/sh',
    require => [Package['nodejs'], Package['curl']],
    environment => 'clean=yes',
  }

  # install sass
  exec { 'gem install sass': 
    command => '/usr/bin/gem install sass',
    require => Package['ruby1.9.3'],
  }

  # create symlink to stop node-modules foler breaking
  exec { 'node-modules symlink': 
    command => '/bin/rm -rfv /usr/local/node_modules && /bin/rm -rfv /vagrant/node_modules && /bin/mkdir /usr/local/node_modules && /bin/ln -sf /usr/local/node_modules /vagrant/node_modules ',
  }

  # finally install grunt
  exec { 'npm install -g grunt-cli bower':,
    command => '/usr/bin/npm install -g grunt-cli bower',
    require => Exec['npm'],
  }

  exec { 'npm-packages':,
    command => '/usr/bin/npm install',
    require => [Exec['npm install -g grunt-cli bower'], Exec['node-modules symlink']],
    cwd => '/vagrant',
  }
}