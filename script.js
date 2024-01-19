$(document).ready(function () {
  // Initialize page
  loadRepositories();

  // Handle per page change
  $('#perPage').change(function () {
      loadRepositories();
  });

  // Handle search
  $('#search').keyup(function () {
      loadRepositories();
  });

  // Function to load repositories
  function loadRepositories() {
      // Show loader
      $('#loader').show();
      // Simulate API call
      setTimeout(function () {
          // Hide loader
          $('#loader').hide();

          // Get selected per page value
          var perPage = $('#perPage').val();

          // Get search value
          var search = $('#search').val();

          // Simulated API response (replace with actual API call)
          var repositories = [
              { name: 'Repo 1', description: 'Description 1', image: 'repo1.jpg' },
              { name: 'Repo 2', description: 'Description 2', image: 'repo2.jpg' },
              // Add more repositories as needed
          ];

          // Filter repositories based on search
          if (search) {
              repositories = repositories.filter(function (repo) {
                  return repo.name.toLowerCase().includes(search.toLowerCase());
              });
          }

          // Display repositories
          displayRepositories(repositories, perPage);
      }, 1000); // Simulated delay of 1 second (replace with actual API call)
  }

  // Function to display repositories
  function displayRepositories(repositories, perPage) {
      var repositoriesContainer = $('#repositories');
      repositoriesContainer.empty();

      // Pagination logic
      var totalPages = Math.ceil(repositories.length / perPage);
      var currentPage = 1;
      var startIndex = (currentPage - 1) * perPage;
      var endIndex = startIndex + perPage;

      // Display repositories for the current page
      for (var i = startIndex; i < endIndex && i < repositories.length; i++) {
          var repo = repositories[i];
          var repoElement = '<div class="repository"><h3>' + repo.name + '</h3><p>' + repo.description + '</p><img src="' + repo.image + '" alt="' + repo.name + '"></div>';
          repositoriesContainer.append(repoElement);
      }

      // Display pagination
      displayPagination(currentPage, totalPages);
  }

  // Function to display pagination
  function displayPagination(currentPage, totalPages) {
      var paginationContainer = $('#pagination');
      paginationContainer.empty();

      for (var i = 1; i <= totalPages; i++) {
          var pageLink = '<a href="#" data-page="' + i + '">' + i + '</a>';
          paginationContainer.append(pageLink);
      }

      // Highlight current page
      paginationContainer.find('a[data-page="' + currentPage + '"]').addClass('active');

      // Handle pagination click
      paginationContainer.find('a').click(function () {
          currentPage = $(this).data('page');
          loadRepositories();
      });
  }
});
