import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { RestaurantsService } from '../../modules/restaurants/restaurants.service';
import { UsersService } from '../../modules/users/users.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const restaurantsService = app.get(RestaurantsService);
  const usersService = app.get(UsersService);

  console.log('🌱 Starting database seeding...');

  // Seed Restaurants
  const restaurants = [
    {
      nameAr: 'مطعم الكشري المصري',
      nameEn: 'Egyptian Koshary Restaurant',
      cuisines: ['Egyptian', 'Fast Food'],
      location: [31.2357, 30.0444],
    },
    {
      nameAr: 'مطعم السوشي الياباني',
      nameEn: 'Japanese Sushi House',
      cuisines: ['Japanese', 'Asian'],
      location: [31.2401, 30.0501],
    },
    {
      nameAr: 'مطعم البيتزا الإيطالية',
      nameEn: 'Italian Pizza Palace',
      cuisines: ['Italian', 'European'],
      location: [31.2289, 30.0392],
    },
    {
      nameAr: 'مطعم البرجر الأمريكي',
      nameEn: 'American Burger Joint',
      cuisines: ['American', 'Fast Food'],
      location: [31.2456, 30.0567],
    },
    {
      nameAr: 'مطعم التاكو المكسيكي',
      nameEn: 'Mexican Taco Fiesta',
      cuisines: ['Mexican', 'Latin'],
      location: [31.2334, 30.0423],
    },
    {
      nameAr: 'مطعم الكاري الهندي',
      nameEn: 'Indian Curry House',
      cuisines: ['Indian', 'Asian'],
      location: [31.2512, 30.0489],
    },
    {
      nameAr: 'مطعم الشاورما اللبنانية',
      nameEn: 'Lebanese Shawarma Corner',
      cuisines: ['Lebanese', 'Middle Eastern'],
      location: [31.2378, 30.0456],
    },
    {
      nameAr: 'مطعم النودلز الصيني',
      nameEn: 'Chinese Noodle Bar',
      cuisines: ['Chinese', 'Asian'],
      location: [31.2423, 30.0512],
    },
    {
      nameAr: 'مطعم الستيك الفرنسي',
      nameEn: 'French Steak Bistro',
      cuisines: ['French', 'European'],
      location: [31.2301, 30.0401],
    },
    {
      nameAr: 'مطعم الفلافل السوري',
      nameEn: 'Syrian Falafel House',
      cuisines: ['Syrian', 'Middle Eastern'],
      location: [31.2445, 30.0534],
    },
  ];

  console.log('📍 Seeding restaurants...');
  for (const restaurant of restaurants) {
    try {
      await restaurantsService.create(restaurant as any);
      console.log(`✅ Created: ${restaurant.nameEn}`);
    } catch (error) {
      console.log(`⚠️  Skipped: ${restaurant.nameEn} (already exists)`);
    }
  }

  // Seed Users
  const users = [
    {
      fullName: 'Ahmed Mosaad',
      favoriteCuisines: ['Egyptian', 'Middle Eastern'],
    },
    {
      fullName: 'Sara Ali',
      favoriteCuisines: ['Japanese', 'Asian'],
    },
    {
      fullName: 'Mohamed Hassan',
      favoriteCuisines: ['Italian', 'European'],
    },
    {
      fullName: 'Fatima Ibrahim',
      favoriteCuisines: ['Indian', 'Asian'],
    },
    {
      fullName: 'Omar Khaled',
      favoriteCuisines: ['American', 'Fast Food'],
    },
    {
      fullName: 'Nour Mahmoud',
      favoriteCuisines: ['Mexican', 'Latin'],
    },
    {
      fullName: 'Youssef Ahmed',
      favoriteCuisines: ['Lebanese', 'Middle Eastern'],
    },
    {
      fullName: 'Layla Samir',
      favoriteCuisines: ['Chinese', 'Asian'],
    },
    {
      fullName: 'Karim Fathy',
      favoriteCuisines: ['French', 'European'],
    },
    {
      fullName: 'Hana Mostafa',
      favoriteCuisines: ['Syrian', 'Middle Eastern'],
    },
  ];

  console.log('\n👥 Seeding users...');
  for (const user of users) {
    try {
      await usersService.create(user);
      console.log(`✅ Created: ${user.fullName}`);
    } catch (error) {
      console.log(`⚠️  Skipped: ${user.fullName} (already exists)`);
    }
  }

  console.log('\n✨ Seeding completed successfully!');
  await app.close();
}

seed()
  .then(() => {
    console.log('👋 Exiting...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
