class RatingWidget extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = '';
    this.attachShadow({mode : 'open'});

    let style = document.createElement('style');
    style.innerHTML = `
            span {
              color: grey;
              font-size: 50px;
            }
            span:hover,span:hover~span {
              cursor: pointer;
              color: orange; 
            }
            div {
              float: left;
              display: flex;
              flex-direction: row-reverse;
          }`;
    this.shadowRoot.appendChild(style);

    let stars = document.createElement('div');
    for (let i = 5; i > 0; i--) {
        let star = document.createElement('span');
        star.textContent = '\u2605'
        star.id = i;
        star.addEventListener('click', this.sendRating)
        stars.appendChild(star);
    }
    this.shadowRoot.appendChild(stars);
  }

  sendRating(event) {
    let formData = new FormData();
    let rating = event.target.id
    formData.append("question", "How satsfied are you?");
    formData.append("sentBy", "JS");
    formData.append("rating", rating);

    fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'X-Sent-By': 'JS'
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
    })
    .catch(error => {
        console.error('Error:', error); 
    });

    let feedbackMessage;
    if (rating >= 4) {
        feedbackMessage = 'Thanks for the ' + rating + ' star rating!';
    } else {
        feedbackMessage = 'Thanks for your feedback of ' + rating+ ' stars. We\'ll try to do better!'
    }

    event.target.parentNode.parentNode.innerHTML = feedbackMessage;
  }
}

customElements.define('rating-widget', RatingWidget);