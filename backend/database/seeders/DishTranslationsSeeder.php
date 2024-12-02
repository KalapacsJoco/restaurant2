<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DishTranslationsSeeder extends Seeder
{
    public function run()
    {
        DB::table('dish_translations')->insert([
            [
                'dish_id' => 28,
                'language' => 'en',
                'name' => 'Cordon Bleu',
                'description' => 'Try the classic Cordon Bleu, where tender chicken breast meets silky cheese and delicious ham, fried to perfection. This irresistible dish is the perfect choice for those seeking unique and fulfilling flavors. Order now and enjoy a sophisticated taste experience!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dish_id' => 28,
                'language' => 'ro',
                'name' => 'Cordon Bleu',
                'description' => 'Încercați clasicul Cordon Bleu, unde pieptul de pui fraged se întâlnește cu brânza catifelată și șunca delicioasă, prăjite la perfecțiune. Acest fel de mâncare irezistibil este alegerea perfectă pentru cei care caută arome unice și pline de satisfacție. Comandați acum și bucurați-vă de o experiență de gust rafinată!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dish_id' => 29,
                'language' => 'en',
                'name' => 'Csirkepaprikás',
                'description' => 'Discover the flavors of traditional Hungarian cuisine with chicken paprikash! Succulent, juicy chicken in a rich paprika sauce, topped with fresh sour cream and served with fluffy dumplings. This home-style dish is the perfect choice for a truly satisfying and delicious meal. Order now and enjoy the classic Hungarian flavors!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dish_id' => 29,
                'language' => 'ro',
                'name' => 'Csirkepaprikás',
                'description' => 'Descoperiți aromele bucătăriei tradiționale maghiare cu papricaș de pui! Carne de pui suculentă și fragedă, într-un sos bogat de paprika, acoperită cu smântână proaspătă și servită cu găluște pufoase. Această mâncare de casă este alegerea perfectă pentru o masă cu adevărat sățioasă și gustoasă. Comandați acum și bucurați-vă de aromele clasice maghiare!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dish_id' => 30,
                'language' => 'en',
                'name' => 'Crispy crunchy chicken breast',
                'description' => 'Try our Crispy crunchy chicken breast, golden brown and crispy on the outside, tender and juicy on the inside! This dish is the perfect choice for those who love light yet satisfying meals. Order now and enjoy the harmony of flavors!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dish_id' => 30,
                'language' => 'ro',
                'name' => 'Piept de pui crocant Crispy',
                'description' => 'Încercați pieptul de pui crocant Crispy, rumenit auriu și crocant la exterior, fraged și suculent la interior! Acest fel de mâncare este alegerea perfectă pentru cei care iubesc mâncărurile ușoare, dar sățioase. Comandați acum și bucurați-vă de armonia gusturilor!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dish_id' => 31,
                'language' => 'en',
                'name' => 'Cheesy pork chop',
                'description' => 'Try our Cheesy pork chop, crispy on the outside, tender on the inside, and generously covered with melted cheese. This classic dish is the perfect choice if you are looking for something truly satisfying and delicious. Order now and enjoy the home-style flavors in the comfort of your home!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dish_id' => 31,
                'language' => 'ro',
                'name' => 'Cotlet de porc cu brânză',
                'description' => 'Încercați cotletul de porc cu brânză, crocant la exterior, fraged la interior și acoperit generos cu brânză topită. Acest fel de mâncare clasic este alegerea perfectă dacă doriți ceva cu adevărat sățios și gustos. Comandați acum și bucurați-vă de aromele de casă în confortul propriei locuințe!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dish_id' => 32,
                'language' => 'en',
                'name' => 'Stuffed cabbage',
                'description' => 'Discover the flavors of traditional stuffed cabbage, where a savory meat filling meets the rich aroma of pickled cabbage leaves. This hearty, home-style dish, served with a thick, spicy sauce and fresh sour cream, is guaranteed to enchant you. Order now and enjoy one of the greatest classics of Hungarian cuisine!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dish_id' => 32,
                'language' => 'ro',
                'name' => 'Sărmale',
                'description' => 'Descoperiți aromele tradiționalei sarmale, unde o umplutură gustoasă de carne se întâlnește cu aroma bogată a frunzelor de varză murată. Acest fel de mâncare consistent, de casă, servit cu un sos gros, picant și smântână proaspătă, vă va fermeca cu siguranță. Comandați acum și bucurați-vă de unul dintre cele mai mari clasice ale bucătăriei maghiare!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more translations for other dishes if necessary
        ]);
    }
}

