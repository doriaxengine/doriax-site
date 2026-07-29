// Ждем полной загрузки HTML, чтобы элемент точно существовал
document.addEventListener("DOMContentLoaded", () => {
    const githubUsername = 'doriaxengine'; 
    const githubRepo = 'doriax';
    const starsCounter = document.getElementById('gh-stars-counter');
    const starsEmoticon = '⭐';
    if (!starsCounter) {
        console.error("No element found with ID 'gh-stars-counter'.");
        return;
    }
    
    console.log("Asking GitHub API for stars of repo:", githubUsername + "/" + githubRepo);

    fetch(`https://api.github.com/repos/${githubUsername}/${githubRepo}`)
        .then(response => {
            console.log("GitHub response status: ", response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Stars fetched:", data.stargazers_count);
            starsCounter.innerText = `${data.stargazers_count}${starsEmoticon}`;
        })
        .catch(error => {
            console.error("Error fetching stars:", error);
            starsCounter.innerText = '💔'; 
        });
});