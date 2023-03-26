import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  
  reviews = [
    {
      userName : "Sarah Johnson",
      imageUrl : "https://www2.deloitte.com/content/dam/Deloitte/nl/Images/promo_images/deloitte-nl-cm-digital-human-promo.jpg",
      content : `"I had a great experience using the family doctor panel site. Booking an appointment was quick and easy, and my doctor was able to provide personalized care that met my needs."`
    },
    {
      userName : "David Lee",
      imageUrl : "https://smilegate.ai/wp-content/uploads/2020/12/amelia-697x464-1.jpg",
      content : `"I've been using the family doctor panel site for over a year now and it's been a game changer. I love being able to communicate with my doctor online and access my medical records whenever I need them."`
    },
    {
      userName : "Emily Davis",
      imageUrl : "https://hospitalnews.com/wp-content/uploads/2020/12/Sophie-side-on-2.png",
      content : `"I was hesitant to use an online platform for healthcare services, but homemed exceeded my expectations. The communication with my doctor was excellent, and I appreciate the convenience of getting appointments online."`
    },
    {
      userName : "Marka Rodriguez",
      imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUcZF_snaJ39ivk0vaIPocjFUntjeL0YKGLe2Z69EtWmPA5ei8vZsRz0p6xgzQZx3z9fk&usqp=CAU",
      content : `"The family doctor panel site has been a lifesaver for me. With a busy schedule, it's been great to be able to get appointments online and go through the care I need without having to take time off work."`
    },
  ]
}
