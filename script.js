const URL = './server.json'

class JsonParse {
    static fetchData(URL) {
        return fetch(URL)
            .then(response => response.json())
    }
}

class TemplateCard {
    static mainCard(item) {
        return `
            <div class="gallery__picture">
                <div class="gallery__picture-img">
                <img src="${item.imgUrl}" alt="The ninth wave">
                </div>
                <div class="gallery__picture-descr">
                <div class="gallery__picture-title">${item.name}</div>
                <div class="gallery__picture-information">
                    Author: <span>${item.author}</span>
                </div>
                <div class="gallery__picture-information">
                    Created: <span>9999</span>
                </div>
                <div class="gallery__picture-information">
                    Location: <span>${item.location}</span>
                </div>
                </div>
            </div>
        `
    }
}

class ContentFilter {
    constructor(data) {
        this.contentItems = data;
    }

    filterByName(keyword = undefined) {
        console.log(keyword)
        return this.contentItems.filter(item => item.name.toLowerCase().includes(keyword ? keyword.toLowerCase() : item.name.toLowerCase()));
    }

    // Другие методы фильтрации, если необходимо

    renderContent(filteredData, template) {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = ''; // Очистка предыдущего контента
        filteredData.forEach(item => {
            const contentItem = document.createElement('div');
            contentItem.innerHTML = template(item);
            contentDiv.appendChild(contentItem);
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    JsonParse.fetchData(URL)
        .then(data => {
            const filter = new ContentFilter(data);

            document.getElementById('name').addEventListener('input', function() {
                const filteredData = filter.filterByName(this.value);
                filter.renderContent(filteredData, TemplateCard.mainCard);
            });

            filter.renderContent(data, TemplateCard.mainCard)
        })
        .catch(error => console.error('Error fetching data:', error))
});