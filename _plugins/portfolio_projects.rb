module PortfolioProjects
  class Generator < Jekyll::Generator
    def generate(site)
      projects = Dir['_includes/portfolio/*.html'].map{|p| p.split('/').last(2).join('/')}

      portfolio = site.pages.detect {|page| page.name == 'index.html'}
      portfolio.data['projects'] = projects
    end
  end
end
