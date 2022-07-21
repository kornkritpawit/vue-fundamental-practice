<template>
  <div v-if="availableParts" class="content">
    <div class="part-info" id="partInfo"></div>
    <div class="preview">
      <CollapsibleSection>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.src" />
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.src" class="rotate-left" />
            <img :src="selectedRobot.torso.src" />
            <img :src="selectedRobot.rightArm.src" class="rotate-right" />
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.src" />
          </div>
        </div>
      </CollapsibleSection>
      <button class="add-to-cart" @click="addToCart()">Add ot Cart</button>
    </div>

    <div class="top-row">
      <!-- <div :class="[saleBorderClass, 'top', 'part']">
        <div class="robot-name">
          {{ selectedRobot.head.title }}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
        </div>

        <img :src="selectedRobot.head.src" title="head" />
        <button @click="selectPreviousHead()" class="prev-selector">
          &#9668;
        </button>
        <button @click="selectNextHead()" class="next-selector">&#9658;</button>
      </div> -->
      <PartSelector
        @partSelected="(part) => testEmithead(part)"
        position="top"
        :parts="availableParts.heads"
      />
    </div>
    <div class="middle-row">
      <!-- <div class="left part">
        <img v-bind:src="selectedRobot.leftArm.src" title="left arm" />
        <button v-on:click="selectPreviousLeftArm()" class="prev-selector">
          &#9650;
        </button>
        <button v-on:click="selectNextLeftArm()" class="next-selector">
          &#9660;
        </button>
      </div>
      <div class="center part">
        <img v-bind:src="selectedRobot.torso.src" title="left arm" />
        <button v-on:click="selectPreviousTorsor()" class="prev-selector">
          &#9668;
        </button>
        <button v-on:click="selectNextTorsor()" class="next-selector">
          &#9658;
        </button>
      </div>
      <div class="right part">
        <img v-bind:src="selectedRobot.rightArm.src" title="left arm" />
        <button v-on:click="selectPreviousRightArm()" class="prev-selector">
          &#9650;
        </button>
        <button v-on:click="selectNextRightArm()" class="next-selector">
          &#9660;
        </button>
      </div> -->
      <PartSelector
        @partSelected="
          (part) => {
            selectedRobot.leftArm = part;
          }
        "
        position="left"
        :parts="availableParts.arms"
      />
      <PartSelector
        @partSelected="(part) => (selectedRobot.torso = part)"
        position="center"
        :parts="availableParts.torsos"
      />
      <PartSelector
        @partSelected="(part) => (selectedRobot.rightArm = part)"
        position="right"
        :parts="availableParts.arms"
      />
    </div>
    <div class="bottom-row">
      <!-- <div class="bottom part">
        <img v-bind:src="selectedRobot.base.src" title="left arm" />
        <button v-on:click="selectPreviousBase()" class="prev-selector">
          &#9668;
        </button>
        <button v-on:click="selectNextBase()" class="next-selector">
          &#9658;
        </button>
      </div> -->
      <PartSelector
        @partSelected="(part) => (selectedRobot.base = part)"
        position="bottom"
        :parts="availableParts.bases"
      />
    </div>
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th class="cost">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(robot, index) in cart" :key="index">
            <td>{{ robot.head.title }}</td>
            <td class="cost">{{ robot.cost }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import availableParts from "../data/parts";
import createdHookMixin from "./created-hook-mixin";
import PartSelector from "./PartSelector.vue";
import CollapsibleSection from "../shared/CollapsibleSection.vue";
import { mapActions, mapMutations } from 'vuex';

// const getPreviousValidIndex = (index, length) => {
//   const deprecatedIndex = index - 1;
//   return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
// };

// function getNextValidIndex(index, length) {
//   const incrementedIndex = index + 1;
//   return incrementedIndex > length - 1 ? 0 : i ncrementedIndex;
// }

export default {
  name: "RobotBuilder",
  components: { PartSelector, CollapsibleSection },
  beforeRouteLeave(to, from, next) {
    if (this.addedToCart) {
      next(true);
    } else {
      /* eslint no-alert: 0 */
      /* eslint no-restricted-globals: 0 */
      const response = confirm(
        "You have not added your robot to your cart, are you sure you want to leave?"
      );
      next(response);
    }
  },
  created() {
    // this.$store.dispatch('getParts')
        // this.$store.dispatch('robots/getParts')
        this.getParts()
  },
  data() {
    return {
      // availableParts,
      //   selectedHeadIndex: 0,
      //   selectedTorsoIndex: 0,
      //   selectedRightArmIndex: 0,
      //   selectedLeftArmIndex: 0,
      //   selectedBaseIndex: 0,
    addedToCart: false,
      cart: [],
      //   headBorderStyle: {border: '3px solid red'},
      selectedRobot: {
        head: {},
        leftArm: {},
        torso: {},
        rightArm: {},
        base: {},
      },
    };
  },
  mixins: [createdHookMixin],
  computed: {
    saleBorderClass() {
      return this.selectedRobot.head.onSale ? "sale-border" : "";
    },
    headBorderStyle() {
      return {
        border: this.selectedRobot.head.onSale
          ? "3px solid red"
          : "3px solid #aaa",
      };
    },
    availableParts() {
        // return this.$store.state.parts
              return this.$store.state.robots.parts;
    },
    // selectedRobot() {
    //   return {
    //     head: availableParts.heads[this.selectedHeadIndex],
    //     leftArm: availableParts.arms[this.selectedLeftArmIndex],
    //     torso: availableParts.torsos[this.selectedTorsoIndex],
    //     rightArm: availableParts.arms[this.selectedRightArmIndex],
    //     base: availableParts.bases[this.selectedBaseIndex],
    //   };
    // },
  },
  methods: {
        ...mapActions('robots', ['getParts', 'addRobotToCart']),

    testEmithead(part) {
      console.log(part);
      this.selectedRobot.head = part;
    },
    addToCart() {
      const robot = this.selectedRobot;
      const cost =
        robot.head.cost +
        robot.leftArm.cost +
        robot.torso.cost +
        robot.rightArm.cost +
        robot.base.cost;
        
      // this.cart.push({ ...robot, cost });
    //   this.$store.commit('addRobotToCart', {...robot, cost})
          // this.$store.dispatch('addRobotToCart', {...robot, cost})
          // this.$store.dispatch('robots/addRobotToCart', {...robot, cost})
                    this.addRobotToCart({...robot, cost})
          .then(() =>this.$router.push('/cart'))

            this.addedToCart = true;
    },
    // selectNextHead() {
    //   //   this.selectedHeadIndex += 1;
    //   //   console.log('selectNextHead called');
    //   this.selectedHeadIndex = getNextValidIndex(
    //     this.selectedHeadIndex,
    //     availableParts.heads.length
    //   );
    // },
    // selectPreviousHead() {
    //   //   this.selectedHeadIndex -= 1;
    //   this.selectedHeadIndex = getPreviousValidIndex(
    //     this.selectedHeadIndex,
    //     availableParts.heads.length
    //   );
    // },
    // selectNextLeftArm() {
    //   this.selectedLeftArmIndex = getNextValidIndex(
    //     this.selectedLeftArmIndex,
    //     availableParts.arms.length
    //   );
    // },
    // selectPreviousLeftArm() {
    //   this.selectedLeftArmIndex = getPreviousValidIndex(
    //     this.selectedLeftArmIndex,
    //     availableParts.arms.length
    //   );
    // },
    // selectNextTorsor() {
    //   this.selectedTorsoIndex = getNextValidIndex(
    //     this.selectedTorsoIndex,
    //     availableParts.torsos.length
    //   );
    // },
    // selectPreviousTorsor() {
    //   this.selectedTorsoIndex = getPreviousValidIndex(
    //     this.selectedTorsoIndex,
    //     availableParts.torsos.length
    //   );
    // },
    // selectNextRightArm() {
    //   this.selectedRightArmIndex = getNextValidIndex(
    //     this.selectedRightArmIndex,
    //     availableParts.arms.length
    //   );
    // },
    // selectPreviousRightArm() {
    //   this.selectedRightArmIndex = getPreviousValidIndex(
    //     this.selectedRightArmIndex,
    //     availableParts.arms.length
    //   );
    // },
    // selectNextBase() {
    //   this.selectedBaseIndex = getNextValidIndex(
    //     this.selectedBaseIndex,
    //     availableParts.bases.length
    //   );
    // },
    // selectPreviousBase() {
    //   this.selectedBaseIndex = getPreviousValidIndex(
    //     this.selectedBaseIndex,
    //     availableParts.bases.length
    //   );
    // },
  },
};
</script>

<style lang="scss" scoped>
.part {
  position: relative;
  width: 165px;
  height: 165px;
  border: 3px solid #aaa;
}
.part {
  img {
    width: 165px;
  }
}
.top-row {
  display: flex;
  justify-content: space-around;
}
.middle-row {
  display: flex;
  justify-content: center;
}
.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale {
  color: red;
}
.content {
  position: relative;
}
.add-to-cart {
  position: absolute;
  width: 210px;
  //   right: 30px;
  padding: 3px;
  font-size: 16px;
}
td,
th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost {
  text-align: right;
}
.sale-border {
  border: 3px solid red;
}

.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}

.part-info {
  position: absolute;
  top: -20px;
  left: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
</style>
