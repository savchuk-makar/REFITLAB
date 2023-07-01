:active-class="'md:dark:text-green-500 md:text-green-500'"
                        class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                О нас
              </router-link>
            </li>
            <li>
              <router-link to="/contacts"
                        :active-class="'md:dark:text-green-500 md:text-green-500'"
                        class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                Контакты
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  
</template>

<script setup>
import ButtonContact from "@/components/button-contact.vue";
import theme from "@/components/theme.vue"
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>